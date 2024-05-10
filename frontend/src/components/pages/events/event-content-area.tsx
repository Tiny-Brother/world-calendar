'use client';

import { Button } from '@/components/ui/button';
import { Editor } from '@/components/ui/editor';
import type { Event } from '@/hooks/use-event-store';
import { useEventStore } from '@/hooks/use-event-store';

export function EventContentArea() {
  const { event, setEvent } = useEventStore();

  return (
    <div className="size-full flex-col px-8 py-2">
      <div className="flex h-8 w-full items-center justify-between">
        <h1 className="text-sm">{event?.title ? event?.title : 'Untitled'}</h1>
        <Button
          size="sm"
          variant="ghost"
          className="text-gray-600 hover:text-gray-900"
        >
          Publish
        </Button>
      </div>
      <div className="mx-14 mt-20">
        <Editor
          onChange={(description) => {
            const newEvent = {
              ...event,
              description,
            } as Event;
            setEvent(newEvent);
          }}
        />
      </div>
    </div>
  );
}
