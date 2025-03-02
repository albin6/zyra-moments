import { EventCard } from "@/components/client/event-hosting/EventCard";
import Pagination from "@/components/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { useAllHostedEvents } from "@/hooks/event/useEvent";
import { getAllHostedEventsByClient } from "@/services/event/eventService";
import { PopulatedEvents } from "@/types/Event";
import { useEffect, useState } from "react";

export default function HostEventListing() {
  const [hostedEvents, setHostedEvents] = useState<PopulatedEvents[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 1;

  const { data, isLoading } = useAllHostedEvents(
    getAllHostedEventsByClient,
    currentPage,
    eventsPerPage
  );

  useEffect(() => {
    if (data) {
      setHostedEvents(data.events);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!hostedEvents) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-4">
        {hostedEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
        <div className="mt-8">
          {totalPages > eventsPerPage && (
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
}
