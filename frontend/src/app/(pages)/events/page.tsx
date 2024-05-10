import { EventContentArea } from '@/components/pages/events/event-content-area';
import { EventScheduleSidePanel } from '@/components/pages/events/event-schedule-side-panel';

export default function EventsPage() {
  return (
    <section className="flex h-screen w-screen divide-x bg-white">
      <EventContentArea />
      <EventScheduleSidePanel />
    </section>
  );
}
