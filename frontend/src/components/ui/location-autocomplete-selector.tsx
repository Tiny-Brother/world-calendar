'use client';

import { CheckIcon } from 'lucide-react';
import { useState } from 'react';

import type { OpeenStreetMap } from '@/hooks/api/use-openstreetmap-location';
import { useOpenStreetMapLocation } from '@/hooks/api/use-openstreetmap-location';
import { useDebounce } from '@/hooks/use-debounce';
import { SEARCH_DEBOUNCE_TIME } from '@/lib/config';
import { cn } from '@/lib/utils';

import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command';
import { FormControl } from './form';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';

type LocationAutocompleteSelectorPops = {
  form: any;
  value: string;
};

export function LocationAutocompleteSelector({
  form,
  value,
}: LocationAutocompleteSelectorPops) {
  const [isOpened, setIsOpened] = useState(false);
  const [input, setInput] = useState('');
  const debouncedValue = useDebounce<string>(input, SEARCH_DEBOUNCE_TIME);
  const { data: locations } = useOpenStreetMapLocation(debouncedValue);
  return (
    <Popover open={isOpened} onOpenChange={setIsOpened}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpened}
            className={cn(
              'w-full justify-between',
              !value && 'text-muted-foreground',
            )}
          >
            {value
              ? locations?.find(
                  (location: OpeenStreetMap) =>
                    `${location.place_id}` === value,
                )?.display_name
              : 'Select location'}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className=" w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search location..."
            className="h-9"
            onValueChange={setInput}
          />
          <ScrollArea className="h-60">
            <CommandEmpty>loading...</CommandEmpty>
            <CommandGroup>
              {locations &&
                locations.map((location: OpeenStreetMap) => (
                  <CommandItem
                    value={`${location.place_id}`}
                    key={location.place_id}
                    onSelect={() => {
                      form.setValue('location', `${location.place_id}`);
                      setIsOpened(false);
                    }}
                  >
                    {location.display_name}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        `${location.place_id}` === value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
