import { useEffect, useState } from "react";
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
import { useCheckOutQuery } from "@/hooks/booking/useCheckout";
import { getServicesOfAVendor } from "@/services/booking/bookingServices";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import { Booking } from "@/types/Booking";
import { BookingSuccessModal } from "../modals/BookingSuccessModal";
import moment from "moment";
import PaymentProcessingModal from "../modals/PaymentProcessingModal";
import { convertDateFormat } from "@/utils/format/convertDateFormat";

export default function VendorBooking() {
  const navigate = useNavigate();
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [services, setServices] = useState<Service[] | null>(null);
  const [vendorData, setVendorData] = useState<{
    _id: string;
    firstName: string;
    lastName: string;
    place: string;
    averageRating: number;
    category: {
      _id: string;
      title: string;
    };
    profileImage: string;
  } | null>(null);

  const { vendorId } = useParams();

  if (!vendorId) {
    return null;
  }

  const getBookingData = (): Booking => {
    console.log("selected date before submitting =>", selectedDate);
    console.log(
      "selected timeslot before submitting =>",
      selectedTimeSlot?.startTime,
      selectedTimeSlot?.endTime
    );
    return {
      bookingDate: convertDateFormat(selectedDate!),
      serviceId: selectedService?._id!,
      timeSlot: {
        startTime: selectedTimeSlot?.startTime!,
        endTime: selectedTimeSlot?.endTime!,
      },
      totalPrice: calculateTotal(),
      vendorId: vendorId,
    };
  };

  const { data, isLoading } = useCheckOutQuery(getServicesOfAVendor, vendorId);

  useEffect(() => {
    if (data) {
      setServices(data.services);
      setVendorData(data.vendor);
    }
  }, [data]);

  const availableDates =
    selectedService?.availableDates.map((d) => new Date(d.date)) || [];

  const getTimeSlots = (date: Date | null) => {
    if (!date || !selectedService) return [];
    const dateStr = format(date, "yyyy-MM-dd");
    const availableDate = selectedService.availableDates.find(
      (d) => d.date === dateStr
    );
    return availableDate?.timeSlots || [];
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    const basePrice = selectedService.servicePrice;
    const platformFee = 5;
    const gst = platformFee * 0.18;
    return basePrice + platformFee + gst;
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!services || !vendorData) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
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
                  <AvatarImage src={vendorData.profileImage} />
                  <AvatarFallback>
                    {vendorData.firstName[0] + vendorData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span>
                      {vendorData.firstName + " " + vendorData.lastName}
                    </span>
                    <span className="text-muted-foreground">Location</span>
                    <span>{vendorData.place || "Not Given"}</span>
                    <span className="text-muted-foreground">Category</span>
                    <span>{vendorData.category.title}</span>
                    <span className="text-muted-foreground">Rating</span>
                    <span>{vendorData.averageRating ?? 0}</span>
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
                  const service = services.find((s) => s._id === value);
                  setSelectedService(service || null);
                  setSelectedDate(null);
                  setSelectedTimeSlot(null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.length === 0 ? (
                    <h1>Not Services Available..</h1>
                  ) : (
                    services.map((service) => (
                      <SelectItem
                        key={service._id}
                        value={service._id as string}
                      >
                        {service.serviceTitle}
                      </SelectItem>
                    ))
                  )}
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
                        console.log("this is selected date =>", date);
                        setSelectedTimeSlot(null);
                      }}
                      disabled={(date) => {
                        const isInPast = date < new Date();

                        const isAvailable = availableDates.some(
                          (availableDate) =>
                            format(availableDate, "yyyy-MM-dd") ===
                            format(date, "yyyy-MM-dd")
                        );

                        return isInPast || !isAvailable;
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

            {/* <Button className="w-full" size="lg" disabled={}>
              Book Now
            </Button> */}

            {selectedService && selectedDate && selectedTimeSlot && (
              <PaymentWrapper
                amount={calculateTotal()}
                getBookingData={getBookingData}
                setBookingSuccess={setIsBookingSuccess}
                setIsOpen={setIsOpen}
                setIsSuccess={setIsSuccess}
              />
            )}
          </CardContent>
        </Card>

        <PaymentProcessingModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isSuccess={isSuccess}
        />

        <BookingSuccessModal
          isOpen={isBookingSuccess}
          onClose={() => {
            setIsBookingSuccess(false);
            navigate("/landing");
          }}
          eventDate={moment(selectedDate).format("LLL")}
          eventName={selectedService?.serviceTitle!}
        />
      </div>
    </div>
  );
}
