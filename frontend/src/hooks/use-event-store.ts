import type { Block } from '@blocknote/core';
import { create } from 'zustand';

export type Event = {
  title: string;
  date: Date;
  location: string;
  description: Block<any, any, any>[] | null;
};

type UseEventStoreProps = {
  event: Event | null;
  setEvent: (event: Event | null) => void;
};

export const useEventStore = create<UseEventStoreProps>()((set) => ({
  event: null,
  setEvent: (event: Event) => set(() => ({ event })),
}));
