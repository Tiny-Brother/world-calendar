'use client';

import { useCalendar } from '@/hooks/use-calendar';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function CalendarModeSelect() {
  const { setViewMode } = useCalendar();

  return (
    <Select defaultValue="month" onValueChange={setViewMode}>
      <SelectTrigger className="h-9 w-24 font-semibold lg:w-36">
        <SelectValue placeholder="Select view mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="day">
            <div>Day View</div>
          </SelectItem>
          <SelectItem value="week">
            <div>Week view</div>
          </SelectItem>
          <SelectItem value="month">
            <div>Month View</div>
          </SelectItem>
          <SelectItem value="year">
            <div>Year View</div>
          </SelectItem>
          <SelectItem value="schedule">
            <div>Schedule View</div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
