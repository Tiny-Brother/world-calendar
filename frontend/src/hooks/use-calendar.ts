import { create } from 'zustand';

type ViewMode = 'day' | 'week' | 'month' | 'year' | 'schedule';

interface Calendar {
  viewMode: ViewMode;
  selectedDate: Date;
  setViewMode: (mode: ViewMode) => void;
  setSelectedDate: (date: Date) => void;
}

export const useCalendar = create<Calendar>()((set) => ({
  viewMode: 'month',
  selectedDate: new Date(),
  setViewMode: (mode: ViewMode) => set(() => ({ viewMode: mode })),
  setSelectedDate: (date: Date) => set(() => ({ selectedDate: date })),
}));
