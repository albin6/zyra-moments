import { EventAttendance } from "@/components/client/EventAttendance";
import { useParams } from "react-router-dom";

export function EventAttendancePage() {
  const { eventId } = useParams();

  if (!eventId) {
    return;
  }

  return (
    <div className="min-h-screen bg-background">
      <EventAttendance eventId={eventId} />
    </div>
  );
}
