import { PopulatedEvents } from "../../entities/models/event.entity";

export interface EventListDto {
  page: number;
  limit: number;
  search?: string;
  filters?: {
    location?: string;
    priceMin?: number;
    priceMax?: number;
  };
  sort?: {
    field: "date" | "startTime" | "pricePerTicket" | "title";
    order: "asc" | "desc";
  };
  // New geospatial fields
  nearby?: boolean; // Flag to enable geospatial search
  longitude?: number; // User's longitude
  latitude?: number; // User's latitude
  maxDistance?: number; // Max distance in meters (default can be set later)
}

// Response DTO (unchanged for now)
export interface EventListResponseDto {
  events: PopulatedEvents[];
  pagination: {
    totalEvents: number;
    totalPages: number;
    currentPage: number;
  };
}
