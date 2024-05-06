'use client';

import { Calendar } from '@/components/ui/calendar';
import { useCalendar } from '@/hooks/use-calendar';

export function Sidebar() {
  const { setSelectedDate, selectedDate } = useCalendar();
  return (
    <aside className="hidden w-72 border-r pr-2 lg:flex ">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          setSelectedDate(date || new Date());
        }}
        className="rounded-md"
      />
    </aside>
  );
}
