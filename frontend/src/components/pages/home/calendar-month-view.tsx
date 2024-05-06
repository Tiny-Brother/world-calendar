'use client';

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getWeeksInMonth,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { isSameDay } from 'date-fns/isSameDay';
import { enUS } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

type CalendarMonthViewProps = {
  currentDate: Date;
};

export function CalendarMonthView({ currentDate }: CalendarMonthViewProps) {
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startWeek = startOfWeek(firstDayOfMonth);
  const endWeek = endOfWeek(lastDayOfMonth);
  const daysInMonth = eachDayOfInterval({ start: startWeek, end: endWeek });
  const weeksInMonth = getWeeksInMonth(currentDate);

  const daysOfWeek = eachDayOfInterval({
    start: startWeek,
    end: endOfWeek(startWeek),
  });

  const weekDays = daysOfWeek.map((day) =>
    format(day, 'EEE', { locale: enUS }),
  );

  return (
    <div className="flex size-full flex-col">
      <div className="flex flex-auto flex-col shadow ring-1 ring-black ring-opacity-5">
        <div className="grid flex-none grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
          {weekDays.map((weekDay) => (
            <div className="flex justify-center bg-white py-2" key={weekDay}>
              <span>{weekDay}</span>
            </div>
          ))}
        </div>
        <div className="flex  flex-auto bg-gray-200 text-xs leading-6 text-gray-700 ">
          <div
            className={cn(
              'grid w-full grid-cols-7 grid-rows-5 gap-px',
              weeksInMonth > 5 && 'grid-rows-6',
            )}
          >
            <AnimatePresence>
              {daysInMonth.map((day) => (
                <div
                  className={cn(
                    'relative bg-white px-3 py-2',
                    isSameMonth(day, currentDate) &&
                      'transition-colors duration-200 ease-in-out hover:bg-primary-foreground',
                    !isSameMonth(day, currentDate) &&
                      'bg-gray-50 text-gray-500',
                  )}
                  key={day.toString()}
                >
                  {isSameDay(day, currentDate) && (
                    <motion.div
                      transition={{
                        type: 'spring',
                        stiffness: 50,
                        duration: 0.5,
                      }}
                      layoutId="date-dot"
                      className={cn(
                        'absolute',
                        'left-1 top-1 z-10 flex size-6 items-center justify-center rounded-full bg-primary font-semibold text-white transition-colors duration-150 ease-out',
                      )}
                    />
                  )}
                  <time
                    className={cn(
                      'absolute left-1 top-1 z-20 translate-x-[8.5px] translate-y-[1.2px]',
                      isSameDay(day, currentDate) &&
                        'text-white transition-colors duration-300 ease-in-out',
                    )}
                    dateTime={format(day, 'yyyy-MM-dd')}
                  >
                    {format(day, 'd')}
                  </time>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
