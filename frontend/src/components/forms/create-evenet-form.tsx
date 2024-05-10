'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format, subDays } from 'date-fns';
import { CalendarIcon, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Event } from '@/hooks/use-event-store';
import { useEventStore } from '@/hooks/use-event-store';
import { getCurrentTimezone } from '@/lib/time';
import { cn } from '@/lib/utils';

import { Calendar } from '../ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import { LocationAutocompleteSelector } from '../ui/location-autocomplete-selector';
import { ScrollArea } from '../ui/scroll-area';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Event title must be provided.',
  }),
  date: z.date({
    required_error: 'The event date is required.',
  }),
  timezone: z.string().min(2, {
    message: 'Event timezone must be provided.',
  }),
  location: z.string().min(2, {
    message: 'Event location must be provided.',
  }),
});

export function CreateEventForm() {
  const { setEvent, event } = useEventStore();
  const [isTimezoneSelectorOpened, setIsTimezoneSelectorOpened] =
    useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      date: new Date(),
      location: '',
      timezone: getCurrentTimezone(),
    },
  });

  const watchedTitle = form.watch('title');

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newEvent: Event = {
      title: data.title,
      date: data.date,
      location: data.location,
      description: event?.description ?? null,
    };
    setEvent(newEvent);
  }

  const onCancel = useCallback(() => {
    setEvent(null);
  }, [setEvent]);

  useEffect(() => {
    const newEvent = {
      ...event,
      title: watchedTitle,
    } as Event;
    setEvent(newEvent);
  }, [watchedTitle, setEvent]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full shrink-0 space-y-6 overflow-y-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add title</FormLabel>
              <FormControl>
                <Input placeholder="event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Add date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < subDays(new Date(), 1)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Add timezone</FormLabel>
              <Popover
                open={isTimezoneSelectorOpened}
                onOpenChange={setIsTimezoneSelectorOpened}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isTimezoneSelectorOpened}
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? field.value : 'Select timezone'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px]  p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search timezone..."
                      className="h-9"
                    />
                    <ScrollArea className="h-96">
                      <CommandEmpty>No timezone found.</CommandEmpty>
                      <CommandGroup>
                        {Intl.supportedValuesOf('timeZone').map((timezone) => {
                          const tz = timezone.replace('_', ' ');
                          return (
                            <CommandItem
                              value={tz}
                              key={tz}
                              onSelect={() => {
                                form.setValue('timezone', tz);
                                setIsTimezoneSelectorOpened(false);
                              }}
                            >
                              {tz}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  tz === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add location</FormLabel>
              <LocationAutocompleteSelector form={form} value={field.value} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" size="sm">
            Save
          </Button>
          <Button
            asChild
            className="text-gray-600"
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            <Link href="/">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
