'use client';

import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Menu, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

import { useCalendar } from '@/hooks/use-calendar';
import { useSidebar } from '@/hooks/use-sidebar';
import { DATE_FORMAT_MONTH_YEAR } from '@/lib/config';

import { Button } from '../ui/button';
import { CalendarModeSelect } from './calendar-mode-select';

const { addDays, subDays } = require('date-fns');

export function Header() {
  const { setSelectedDate, selectedDate, setViewMode } = useCalendar();
  const { setIsOpen, isOpen } = useSidebar();

  const handleNextDate = useCallback(() => {
    setSelectedDate(addDays(selectedDate, 1));
  }, [setSelectedDate, selectedDate]);

  const handleTodayDate = useCallback(() => {
    setSelectedDate(new Date());
  }, [setSelectedDate]);

  const handlePreviousDate = useCallback(() => {
    setSelectedDate(subDays(selectedDate, 1));
  }, [setSelectedDate, selectedDate]);

  const handleLogoClick = useCallback(() => {
    setViewMode('month');
  }, [setViewMode]);

  const handleOpenSideBar = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  return (
    <header className="flex  items-center justify-between border-b bg-white px-8 py-2 text-black">
      <div className="flex items-center justify-center gap-12">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" onClick={handleOpenSideBar}>
            <Menu className="size-6" />
          </Button>
          <Link href="/" onClick={handleLogoClick}>
            <h1 className="text-lg font-medium">World Calendar</h1>
          </Link>
          <h4 className="ml-8 hidden text-base font-semibold leading-6 text-gray-900 md:flex">
            <time>{format(selectedDate, DATE_FORMAT_MONTH_YEAR)}</time>
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
              onClick={handlePreviousDate}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              className="hidden rounded-none px-3.5 text-sm font-semibold text-gray-900 shadow-none hover:bg-gray-50 focus:relative md:block"
              variant="ghost"
              size="sm"
              onClick={handleTodayDate}
            >
              Today
            </Button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <Button
              className="h-9 w-12 rounded-l-none shadow-none"
              variant="ghost"
              onClick={handleNextDate}
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
