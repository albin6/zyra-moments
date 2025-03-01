import { EventCard } from "@/components/client/event-hosting/EventListing";

const events = [
  {
    _id: "1",
    title: "CAREER COACHING TECHNIQUES & SKILLS",
    subtitle:
      "ONE DAY TRAIN THE TRAINERS WORKSHOP ON CAREER COACHING TECHNIQUES & SKILLS",
    date: new Date("2024-01-30"),
    pricePerTicket: 500,
    posterImage: "/placeholder.svg?height=60&width=60",
  },
];

export default function HostEventListing() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
