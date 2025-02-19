import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Service, TimeSlot } from "@/types/Service";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentWrapper } from "../stripe/PaymentForm";

// Example services data - replace with your actual data fetching logic
const exampleServices: Service[] = [
  {
    _id: "1",
    vendorId: "v1",
    serviceTitle: "Basic Photography",
    yearsOfExperience: 5,
    availableDates: [
      {
        date: "2025-02-20",
        timeSlots: [
          { startTime: "09:00", endTime: "12:00", capacity: 1 },
          { startTime: "14:00", endTime: "17:00", capacity: 1 },
        ],
      },
      {
        date: "2025-02-21",
        timeSlots: [
          { startTime: "10:00", endTime: "13:00", capacity: 1 },
          { startTime: "15:00", endTime: "18:00", capacity: 1 },
        ],
      },
    ],
    serviceDescription: "Professional photography service",
    serviceDuration: 3,
    servicePrice: 150,
    additionalHoursPrice: 50,
    cancellationPolicies: ["24 hours notice required"],
    termsAndConditions: ["Deposit required", "Weather dependent"],
  },
];

export default function VendorBooking() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );

  // Filter available dates for the calendar
  const availableDates =
    selectedService?.availableDates.map((d) => new Date(d.date)) || [];

  // Get time slots for selected date
  const getTimeSlots = (date: Date | null) => {
    if (!date || !selectedService) return [];
    const dateStr = format(date, "yyyy-MM-dd");
    const availableDate = selectedService.availableDates.find(
      (d) => d.date === dateStr
    );
    return availableDate?.timeSlots || [];
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedService) return 0;
    const basePrice = selectedService.servicePrice;
    const platformFee = 5;
    const gst = platformFee * 0.18;
    return basePrice + platformFee + gst;
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Vendor Details Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Vendor Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JJ</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span>James Jacob</span>
                    <span className="text-muted-foreground">Location</span>
                    <span>Xyz, Abcd</span>
                    <span className="text-muted-foreground">Category</span>
                    <span>Photography</span>
                    <span className="text-muted-foreground">Rating</span>
                    <span>4.2</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedService && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Service Duration
                    </span>
                    <span>{selectedService.serviceDuration} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Price</span>
                    <span>₹{selectedService.servicePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Additional Hour Price
                    </span>
                    <span>₹{selectedService.additionalHoursPrice}</span>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="policies">
                    <AccordionTrigger>Cancellation Policies</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {selectedService.cancellationPolicies.map(
                          (policy, index) => (
                            <li key={index}>{policy}</li>
                          )
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="terms">
                    <AccordionTrigger>Terms & Conditions</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {selectedService.termsAndConditions.map(
                          (term, index) => (
                            <li key={index}>{term}</li>
                          )
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose Service*</label>
              <Select
                onValueChange={(value) => {
                  const service = exampleServices.find((s) => s._id === value);
                  setSelectedService(service || null);
                  setSelectedDate(null);
                  setSelectedTimeSlot(null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {exampleServices.map((service) => (
                    <SelectItem key={service._id} value={service._id as string}>
                      {service.serviceTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedService && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Pick date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate
                        ? format(selectedDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={(date) => {
                        setSelectedDate(date ?? null);
                        setSelectedTimeSlot(null);
                      }}
                      disabled={(date) => {
                        return !availableDates.some(
                          (availableDate) =>
                            format(availableDate, "yyyy-MM-dd") ===
                            format(date, "yyyy-MM-dd")
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {selectedDate && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Choose Time Slot</label>
                <RadioGroup
                  onValueChange={(value) => {
                    const timeSlots = getTimeSlots(selectedDate);
                    const slot = timeSlots.find(
                      (slot) => `${slot.startTime}-${slot.endTime}` === value
                    );
                    setSelectedTimeSlot(slot || null);
                  }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {getTimeSlots(selectedDate).map((slot, index) => (
                      <div key={index}>
                        <RadioGroupItem
                          value={`${slot.startTime}-${slot.endTime}`}
                          id={`slot-${index}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`slot-${index}`}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Clock className="mb-2 h-4 w-4" />
                          <span className="text-sm">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Number</label>
              <Input type="tel" placeholder="+1234 567890" />
              <p className="text-xs text-muted-foreground">
                We will send you the ticket on this number. If you do not have a
                WhatsApp number, please enter any other phone number.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="Email" />
            </div>

            {selectedService && (
              <Card className="mt-6">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Summary</h3>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>{selectedService.serviceTitle}</span>
                        <span>₹{selectedService.servicePrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee</span>
                        <span>₹5.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST on Platform Fee</span>
                        <span>₹0.90</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Total Amount</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              className="w-full"
              size="lg"
              disabled={!selectedService || !selectedDate || !selectedTimeSlot}
            >
              Book Now
            </Button>
            <PaymentWrapper />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
