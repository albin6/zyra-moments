import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function UserEvents() {
  const events = [
    {
      id: 1,
      name: "Tech Conference 2023",
      date: "2023-09-15",
      role: "Organizer",
    },
    { id: 2, name: "Music Festival", date: "2023-07-22", role: "Attendee" },
    { id: 3, name: "Charity Gala", date: "2023-11-05", role: "Volunteer" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>{event.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>{event.role}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
