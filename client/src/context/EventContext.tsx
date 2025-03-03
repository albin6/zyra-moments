import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the event data interface
interface EventData {
  title: string;
  description: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  pricePerTicket: string;
  ticketLimit: string;
  eventLocation: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  posterImage: File | null;
}

// Define the context interface
interface EventContextType {
  eventData: EventData;
  updateEventData: (data: Partial<EventData>) => void;
  resetEventData: () => void;
}

// Default values for the event data
const defaultEventData: EventData = {
  title: "",
  description: "",
  date: undefined,
  startTime: "",
  endTime: "",
  pricePerTicket: "",
  ticketLimit: "",
  eventLocation: "",
  coordinates: { lat: 9.983085, lng: 76.300583 },
  posterImage: null,
};

// Create the context
const EventContext = createContext<EventContextType | undefined>(undefined);

// Create a provider component
interface EventProviderProps {
  children: ReactNode;
  initialData?: Partial<EventData>;
}

export const EventProvider: React.FC<EventProviderProps> = ({
  children,
  initialData,
}) => {
  // Initialize state with default values or provided initial data
  const [eventData, setEventData] = useState<EventData>({
    ...defaultEventData,
    ...initialData,
  });

  // Function to update event data
  const updateEventData = (data: Partial<EventData>) => {
    setEventData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  // Function to reset event data to default
  const resetEventData = () => {
    setEventData(defaultEventData);
  };

  return (
    <EventContext.Provider
      value={{
        eventData,
        updateEventData,
        resetEventData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use the event context
export const useEventContext = (): EventContextType => {
  const context = useContext(EventContext);

  if (context === undefined) {
    throw new Error("useEventContext must be used within an EventProvider");
  }

  return context;
};
