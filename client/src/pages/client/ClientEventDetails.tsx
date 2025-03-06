import EventDetails from "@/components/client/EventDetails";
import LoadingEventDetails from "@/components/client/LoadingEventDetails";
import { Event, useEventQuery } from "@/hooks/event/useEvent";
import { PopulatedEvents } from "@/types/Event";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ClientEventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<PopulatedEvents | null>(null);

  const { data, isLoading } = useEventQuery(id);

  useEffect(() => {
    if (data) {
      console.log(data);
      setEvent(data.event);
    }
  }, [data]);

  if (isLoading || !event) {
    return <LoadingEventDetails />;
  }
  return <EventDetails event={event as unknown as Event} />;
}
