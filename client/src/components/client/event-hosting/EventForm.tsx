import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Upload } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadToCloudinary } from "@/utils/upload-cloudinary/cloudinary";
import {
  TransformedEventData,
  transformEventFormData,
} from "@/utils/format/transformEventFormData";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  date: z.date({ required_error: "Date is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  pricePerTicket: z.string().min(1, { message: "Price is required" }),
  ticketLimit: z.string().min(1, { message: "Ticket limit is required" }),
  eventLocation: z.string().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  posterImage: z.any().optional(),
});

export type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  initialData?: EventFormValues;
  onSubmit: (data: TransformedEventData) => void;
  isEditing?: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  id?: string;
}

export interface MapMarkerProps {
  position: [number, number] | undefined;
  setPosition: (pos: [number, number]) => void;
}

function MapMarker({ position, setPosition }: MapMarkerProps) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  if (!position) {
    return;
  }

  return (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })}
    />
  );
}

export default function EventForm({
  initialData,
  onSubmit,
  isEditing = false,
  setActiveTab,
}: EventFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    9.983085, 76.300583,
  ]); // Default to London
  const [searchAddress, setSearchAddress] = useState("");

  // Generate hours for time selection
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return [`${hour}:00`, `${hour}:15`, `${hour}:30`, `${hour}:45`];
  }).flat();

  // Initialize form with react-hook-form
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
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
    },
  });

  // Handle form submission
  const handleSubmit = (values: EventFormValues) => {
    values.coordinates = { lat: mapPosition[0], lng: mapPosition[1] };

    const transformedData = transformEventFormData(values);

    onSubmit(transformedData);
  };

  // Handle file change for poster image
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      form.setValue("posterImage", url);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Set image preview if editing and image exists
  useEffect(() => {
    if (
      initialData?.posterImage &&
      typeof initialData.posterImage === "string"
    ) {
      setImagePreview(initialData.posterImage);
    }

    // Set map position if editing and coordinates exist
    if (initialData?.coordinates) {
      setMapPosition([
        initialData.coordinates.lat,
        initialData.coordinates.lng,
      ]);
    }
  }, [initialData]);

  // Handle geocoding to convert address to coordinates
  const handleAddressSearch = async () => {
    if (!searchAddress) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchAddress
        )}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMapPosition([parseFloat(lat), parseFloat(lon)]);
        form.setValue("eventLocation", searchAddress);
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Event" : "Create New Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full pl-3 text-left font-normal h-10"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-muted-foreground">
                                Select Date
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Start Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select start time">
                            {field.value || (
                              <span className="text-muted-foreground">
                                Select start time
                              </span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[200px]">
                        {hours.map((time) => (
                          <SelectItem key={`start-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">End Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select end time">
                            {field.value || (
                              <span className="text-muted-foreground">
                                Select end time
                              </span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[200px]">
                        {hours.map((time) => (
                          <SelectItem key={`end-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="pricePerTicket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Price per ticket
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ticketLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Ticket limit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-1">
              <FormField
                control={form.control}
                name="eventLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Event location</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter location"
                            value={searchAddress}
                            onChange={(e) => setSearchAddress(e.target.value)}
                            onBlur={() => field.onChange(searchAddress)}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleAddressSearch}
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            Search
                          </Button>
                        </div>
                        <div className="relative w-full h-[300px] rounded-md overflow-hidden border">
                          {typeof window !== "undefined" && (
                            <MapContainer
                              center={mapPosition}
                              zoom={13}
                              style={{ height: "100%", width: "100%" }}
                            >
                              <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              />
                              <MapMarker
                                position={mapPosition}
                                setPosition={setMapPosition}
                              />
                            </MapContainer>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Click on the map to set the event location or search
                          by address.
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-1">
              <FormField
                control={form.control}
                name="posterImage"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-base">Poster image</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full md:w-auto"
                            onClick={() =>
                              document.getElementById("poster-upload")?.click()
                            }
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose File
                          </Button>
                          <Input
                            id="poster-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            {...field}
                          />
                          {value && (
                            <span className="text-sm text-muted-foreground">
                              {typeof value === "object"
                                ? value.name
                                : "Image selected"}
                            </span>
                          )}
                        </div>
                        {imagePreview && (
                          <div className="mt-2 relative w-full h-[200px] rounded-md overflow-hidden border">
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Poster preview"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pb-0 pt-6">
              <div className="flex w-full gap-4">
                <Button type="submit" className="flex-1">
                  {isEditing ? "Update Event" : "Create Event"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("event-list")}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
