'use client';

import { useState } from 'react';

import { Calendar } from '@/components/ui/calendar';

export function Sidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <aside className="hidden w-72 border-r pr-2 lg:flex ">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md"
      />
    </aside>
  );
}
