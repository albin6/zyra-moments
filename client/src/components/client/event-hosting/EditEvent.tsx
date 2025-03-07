import { useState, useEffect } from "react";
import EventForm from "./EventForm";
import {
  transformBackendToFormData,
  TransformedEventData,
} from "@/utils/format/transformEventFormData";
import { Card, CardContent } from "@/components/ui/card";
import { useEventQuery } from "@/hooks/event/useEvent";
import { PopulatedEvents } from "@/types/Event";

interface EditEventProps {
  eventId: string;
  onSubmit: (data: TransformedEventData) => void;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const EditEvent = ({ eventId, onSubmit, setActiveTab }: EditEventProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState<PopulatedEvents | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data } = useEventQuery(eventId);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setIsLoading(true);

        if (data) {
          setEventData(data?.event);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError("Failed to load event data. Please try again.");
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId, data]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-60">
            <div className="text-center">
              <p className="text-muted-foreground">Loading event data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !eventData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-60">
            <div className="text-center">
              <p className="text-destructive">{error || "Event not found"}</p>
              <button
                onClick={() => setActiveTab("event-list")}
                className="mt-4 text-blue-500 hover:underline"
              >
                Back to Events
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Transform backend data to form format
  const formData = transformBackendToFormData(eventData);

  return (
    <EventForm
      initialData={formData}
      onSubmit={onSubmit}
      id={eventId}
      isEditing={true}
      setActiveTab={setActiveTab}
    />
  );
};

export default EditEvent;
