'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Calendar } from '@/components/ui/calendar';
import { useCalendar } from '@/hooks/use-calendar';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

const sidebarPanelAnimation = {
  initial: { width: '0' },
  animate: { width: '380px' },
  exit: { width: '0' },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

type SidePanelProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidePanelProps) => {
  const { selectedDate, setSelectedDate } = useCalendar();
  const { isOpen } = useSidebar();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          className={cn(
            'h-full min-h-screen w-0 overflow-scroll bg-white shadow-sm	md:w-[380px]	',
            className,
          )}
          {...sidebarPanelAnimation}
        >
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date || new Date());
              }}
              className="rounded-md"
            />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
