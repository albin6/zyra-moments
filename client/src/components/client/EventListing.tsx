import React, { useState } from "react";
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
import { EventQueryParams, useEventListing } from "@/hooks/event/useEvent";

export const EventListing: React.FC = () => {
  // Enhanced Filtering States
  const [filters, setFilters] = useState<EventQueryParams>({
    search: "",
    category: "All",
    page: 1,
    limit: 6,
  });

  // // Categories list
  // const categories = [
  //   "All",
  //   "Wedding",
  //   "Corporate",
  //   "Birthday",
  //   "Concert",
  //   "Exhibition",
  // ];

  // Sort options updated to match API fields
  const sortOptions = [
    { label: "Date: Newest", field: "date", order: "desc" },
    { label: "Date: Oldest", field: "date", order: "asc" },
    { label: "Name: A-Z", field: "title", order: "asc" },
    { label: "Name: Z-A", field: "title", order: "desc" },
    { label: "Price: Low to High", field: "pricePerTicket", order: "asc" },
    { label: "Price: High to Low", field: "pricePerTicket", order: "desc" },
  ];

  // Fetch events using the hook with filters
  const { data, isLoading } = useEventListing({
    page: filters.page,
    limit: filters.limit,
    search: filters.search,
    category: filters.category !== "All" ? filters.category : "",
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    sortField: filters.sortField,
    sortOrder: filters.sortOrder,
  });

  // Pagination Handler
  const paginate = (pageNumber: number) => {
    setFilters((prev) => ({ ...prev, page: pageNumber }));
  };

  // Handle filter changes
  const handleFilterChange = (filterUpdate: Partial<EventQueryParams>) => {
    setFilters((prev) => ({
      ...prev,
      ...filterUpdate,
      // Reset to page 1 when filters change
      page: filterUpdate.page || 1,
    }));
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const [field, order] = value.split(":");
    handleFilterChange({
      sortField: field as "date" | "title" | "pricePerTicket",
      sortOrder: order as "asc" | "desc",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Event Listings</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Input */}
        <Input
          placeholder="Search events..."
          value={filters.search || ""}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="md:w-1/4"
        />

        {/* Category Filter */}
        {/* <Select
          value={filters.category || "All"}
          onValueChange={(value) => handleFilterChange({ category: value })}
        >
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        {/* Price Range Inputs */}
        <Input
          type="number"
          placeholder="Min Price"
          value={filters.priceMin ?? ""}
          onChange={(e) =>
            handleFilterChange({
              priceMin: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="md:w-1/4"
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={filters.priceMax ?? ""}
          onChange={(e) =>
            handleFilterChange({
              priceMax: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="md:w-1/4"
        />

        {/* Sorting Dropdown */}
        <Select
          value={`${filters.sortField || "date"}:${
            filters.sortOrder || "desc"
          }`}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem
                key={`${option.field}:${option.order}`}
                value={`${option.field}:${option.order}`}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => <EventListingSkeletonCard key={index} />)
          : data?.events.map((event) => (
              <EventLisitingCard key={event._id} event={event} />
            ))}
      </div>

      {/* Pagination */}
      {!isLoading && data && data.pagination.totalPages > 0 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: data.pagination.totalPages }, (_, i) => (
            <Button
              key={i}
              variant={
                data.pagination.currentPage === i + 1 ? "default" : "outline"
              }
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}

      {/* No Results State */}
      {!isLoading && data && data.events.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No events found. Try adjusting your search or filters.
        </div>
      )}
    </div>
  );
};
