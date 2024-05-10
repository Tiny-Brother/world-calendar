'use client';

import { motion } from 'framer-motion';
import { ChevronsRight, Settings } from 'lucide-react';
import { useCallback, useState } from 'react';

import { CreateEventForm } from '@/components/forms/create-evenet-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidePanelAnimationVariants = {
  hide: { width: '40px' },
  show: { width: '420px' },
};

export const EventScheduleSidePanel = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenSidePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return (
    <motion.aside
      className={cn(
        'h-full w-[40px] overflow-y-auto overflow-x-hidden bg-gray-50 px-1 py-2',
        isOpen && 'px-4',
      )}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      variants={sidePanelAnimationVariants}
      animate={isOpen ? 'show' : 'hide'}
    >
      <div className="flex size-full flex-col overflow-y-auto overflow-x-hidden">
        <div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              isOpen && '-ml-2',
            )}
            onClick={handleOpenSidePanel}
          >
            {isOpen ? (
              <ChevronsRight className="size-4" />
            ) : (
              <Settings className="size-4" />
            )}
          </Button>
        </div>
        <div
          className={cn('mr-1 w-[295px] overflow-y-auto', !isOpen && 'hidden')}
        >
          <CreateEventForm />
        </div>
        <div />
      </div>
    </motion.aside>
  );
};
