import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventLisitingCard } from "./EventLisitingCard";
import { EventListingSkeletonCard } from "./EventListingSkeletonCard";

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

const categories = [
  "All",
  "Wedding",
  "Corporate",
  "Birthday",
  "Concert",
  "Exhibition",
];
const sortOptions = ["Date: Newest", "Date: Oldest", "Name: A-Z", "Name: Z-A"];

export const EventListing: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Date: Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const eventsPerPage = 6;

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const dummyEvents: Event[] = [
        {
          id: "1",
          title: "Summer Wedding Expo",
          category: "Wedding",
          date: "2024-07-15",
          time: "10:00 AM",
          location: "Central Park",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "2",
          title: "Tech Conference 2024",
          category: "Corporate",
          date: "2024-09-20",
          time: "9:00 AM",
          location: "Convention Center",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "3",
          title: "Annual Charity Gala",
          category: "Corporate",
          date: "2024-11-05",
          time: "7:00 PM",
          location: "Grand Hotel",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "4",
          title: "Rock Music Festival",
          category: "Concert",
          date: "2024-08-10",
          time: "4:00 PM",
          location: "City Stadium",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "5",
          title: "Art Exhibition Opening",
          category: "Exhibition",
          date: "2024-10-01",
          time: "6:00 PM",
          location: "Modern Art Museum",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: "6",
          title: "Kids Birthday Party Expo",
          category: "Birthday",
          date: "2024-06-30",
          time: "11:00 AM",
          location: "Community Center",
          image: "/placeholder.svg?height=200&width=300",
        },
        // Add more dummy events as needed
      ];
      setEvents(dummyEvents);
      setFilteredEvents(dummyEvents);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let result = events;

    if (selectedCategory !== "All") {
      result = result.filter((event) => event.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "Date: Newest":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "Date: Oldest":
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "Name: A-Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Name: Z-A":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFilteredEvents(result);
    setCurrentPage(1);
  }, [events, selectedCategory, searchTerm, sortBy]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Event Listings</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => <EventListingSkeletonCard key={index} />)
          : currentEvents.map((event) => (
              <EventLisitingCard key={event.id} event={event} />
            ))}
      </div>

      {!isLoading && (
        <div className="flex justify-center gap-2">
          {Array.from(
            { length: Math.ceil(filteredEvents.length / eventsPerPage) },
            (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
};
