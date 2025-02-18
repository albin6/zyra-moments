import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Edit, IndianRupee } from "lucide-react";
import { Service } from "./ServiceList";
import { useNavigate } from "react-router-dom";

interface ServiceCardsProps {
  services: Service[];
}

const ServiceCards: React.FC<ServiceCardsProps> = ({ services }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {services.map((service) => (
        <Card key={service._id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{service.serviceTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-4">
              {service.serviceDescription}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>{service.serviceDuration} hours</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-2">
              <IndianRupee className="h-4 w-4" />
              <span>₹{service.servicePrice.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(`/vendor/services/${service._id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ServiceCards;
