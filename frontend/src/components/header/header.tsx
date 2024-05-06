import { ChevronLeft, ChevronRight, Menu, PlusIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { CalendarModeSelect } from './calendar-mode-select';

export function Header() {
  return (
    <header className="flex  items-center justify-between border-b bg-white px-8 py-2 text-black">
      <div className="flex items-center justify-center gap-12">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon">
            <Menu className="size-6" />
          </Button>
          <h1 className="text-lg font-medium">World Calendar</h1>
          <h4 className="ml-8 hidden text-base font-semibold leading-6 text-gray-900 md:flex">
            <time dateTime="2024-05">March 2024</time>
          </h4>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="hidden items-center lg:flex">
          <div className="relative flex items-center rounded-md border bg-white md:items-stretch">
            <Button
              className="flex w-12 rounded-r-none shadow-none"
              variant="ghost"
              size="sm"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              className="hidden rounded-none px-3.5 text-sm font-semibold text-gray-900 shadow-none hover:bg-gray-50 focus:relative md:block"
              variant="ghost"
              size="sm"
            >
              Today
            </Button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <Button
              className="h-9 w-12 rounded-l-none shadow-none"
              variant="ghost"
            >
              <span className="sr-only">Next month</span>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
        <div className="hidden sm:flex">
          <CalendarModeSelect />
        </div>
        <div className="hidden h-6 w-px bg-gray-300 md:flex" />
        <Button className="hidden gap-2 sm:flex md:w-24 lg:w-32" size="sm">
          <PlusIcon className="size-4" />
          Add Event
        </Button>
      </div>
    </header>
  );
}
