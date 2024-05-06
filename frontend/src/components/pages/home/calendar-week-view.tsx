import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
} from 'date-fns';
import { enUS } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { cn, hours } from '@/lib/utils';

const morning = 'AM';
const afternoon = 'PM';

type CalendarWeekViewProps = {
  currentDate: Date;
  onSelectDay: (date: Date) => void;
};

export function CalendarWeekView({
  currentDate,
  onSelectDay,
}: CalendarWeekViewProps) {
  const startWeek = startOfWeek(currentDate);
  const endWeek = endOfWeek(startWeek);

  const daysOfWeek = eachDayOfInterval({
    start: startWeek,
    end: endWeek,
  });

  return (
    <div className="flex size-full flex-col">
      <div className="no-scrollbar isolate flex flex-auto flex-col overflow-auto bg-white">
        <div className="flex max-w-full flex-none flex-col  sm:max-w-none md:max-w-full">
          <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />

              {daysOfWeek.map((dayOfWeek) => (
                <Button
                  variant="ghost"
                  key={dayOfWeek.toString()}
                  className="flex h-16 cursor-pointer items-center justify-center rounded-none py-3"
                  onClick={() => {
                    onSelectDay(dayOfWeek);
                  }}
                >
                  <span>
                    {format(dayOfWeek, 'EEE', { locale: enUS })}{' '}
                    <span
                      className={cn(
                        ' relative flex items-center justify-center font-semibold text-gray-900',
                      )}
                    >
                      <AnimatePresence initial={false}>
                        {isSameDay(dayOfWeek, currentDate) && (
                          <motion.span
                            transition={{
                              type: 'spring',
                              stiffness: 50,
                              duration: 0.5,
                            }}
                            layoutId="date-dot"
                            className="absolute -left-0.5 -top-1  size-8 rounded-full bg-primary  p-1.5 text-white"
                          />
                        )}
                      </AnimatePresence>
                      <span
                        className={cn(
                          'left-0 top-0 z-10',
                          isSameDay(dayOfWeek, currentDate) &&
                            'text-white transition-colors duration-300 ease-in-out',
                        )}
                      >
                        {format(dayOfWeek, 'd')}
                      </span>
                    </span>
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(24, minmax(3.5rem, 1fr))' }}
              >
                <div className="row-end-1 h-7" />
                {hours.map((hour, index) => {
                  const suffix = index > 11 ? afternoon : morning;
                  return (
                    <div key={`${hour}+${suffix}`}>
                      <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {hour}
                        {suffix}
                      </div>
                    </div>
                  );
                })}
                <div />
              </div>
              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
