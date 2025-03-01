import EventForm, {
  EventFormValues,
} from "@/components/client/event-hosting/EventForm";
import { useEventMutation } from "@/hooks/event/useEvent";
import { hostNewEvent } from "@/services/event/eventService";
import { TransformedEventData } from "@/utils/format/transformEventFormData";
import { toast } from "sonner";

interface EventAddEditProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setIsHostEventEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isHostEventEditing: boolean;
}

const dummyData = {
  title: "Music Festival 2025",
  description: "A grand music festival featuring various artists.",
  date: new Date("2025-06-15"),
  startTime: "18:00",
  endTime: "23:00",
  pricePerTicket: "50",
  ticketLimit: "500",
  location: "Central Park, NYC",
  posterImage: null,
};

function EventAddEdit({ setActiveTab, isHostEventEditing }: EventAddEditProps) {
  const { mutate: newEvent } = useEventMutation(hostNewEvent);

  const handleSubmit = (data: TransformedEventData) => {
    console.log("new host event form submission", data);
    newEvent(data, {
      onSuccess: (data) => toast.success(data.message),
      onError: (error: any) => toast.error(error.response.data.message),
    });
  };

  return (
    <EventForm
      onSubmit={handleSubmit}
      initialData={dummyData}
      isEditing={isHostEventEditing}
      setActiveTab={setActiveTab}
    />
  );
}

export default EventAddEdit;
