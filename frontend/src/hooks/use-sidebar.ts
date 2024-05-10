import { create } from 'zustand';

interface UseSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSidebar = create<UseSidebarProps>()((set) => ({
  isOpen: true,
  setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
}));
