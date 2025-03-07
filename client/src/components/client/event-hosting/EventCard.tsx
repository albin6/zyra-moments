import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PopulatedEvents } from "@/types/Event";
import { EventModal } from "@/components/modals/EventModal";
import { useState } from "react";

interface EventCardProps {
  event: PopulatedEvents;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setIsHostEventEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EventCard({ event, setIsHostEventEditing }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  return <></>;
}
