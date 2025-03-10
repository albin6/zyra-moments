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
}

// Response DTO
export interface EventListResponseDto {
  events: PopulatedEvents[];
  pagination: {
    totalEvents: number;
    totalPages: number;
    currentPage: number;
  };
}
