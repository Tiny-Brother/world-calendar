'use client';

import { useCallback } from 'react';

import { useCalendar } from '@/hooks/use-calendar';

import { CalendarMonthView } from './calendar-month-view';
import { CalendarWeekView } from './calendar-week-view';

export function CalendarView() {
  const { viewMode, selectedDate, setSelectedDate } = useCalendar();

  const renderCalendarMode = useCallback(() => {
    if (viewMode === 'week') {
      return CalendarWeekView({
        currentDate: selectedDate,
        onSelectDay: setSelectedDate,
      });
    }

    return CalendarMonthView({ currentDate: selectedDate });
  }, [viewMode, selectedDate, setSelectedDate]);

  return <div className="w-full">{renderCalendarMode()}</div>;
}
