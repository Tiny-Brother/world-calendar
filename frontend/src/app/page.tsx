import { CalendarView } from '@/components/pages/home/calendar-view';
import { Sidebar } from '@/components/pages/home/sidebar';

export default function Home() {
  return (
    <main className="flex h-[calc(100vh-56px)] bg-white p-8">
      <Sidebar />
      <CalendarView />
    </main>
  );
}
