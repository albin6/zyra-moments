import { DomainError } from "../../entities/utils/domain-error";
import { EventListDto } from "../dtos/event.dto";

export function validateCriteria(criteria: EventListDto): void {
  // Page validation
  if (criteria.page !== undefined && criteria.page < 1) {
    throw new DomainError("INVALID_PAGE", "Page number must be at least 1");
  }

  // Limit validation
  if (
    criteria.limit !== undefined &&
    (criteria.limit < 1 || criteria.limit > 100)
  ) {
    throw new DomainError("INVALID_LIMIT", "Limit must be between 1 and 100");
  }

  // Sort validation
  if (criteria.sort) {
    const validSortFields = ["date", "startTime", "pricePerTicket", "title"];
    if (!validSortFields.includes(criteria.sort.field)) {
      throw new DomainError("INVALID_SORT_FIELD", "Invalid sort field");
    }
    if (criteria.sort.order && !["asc", "desc"].includes(criteria.sort.order)) {
      throw new DomainError(
        "INVALID_SORT_ORDER",
        'Sort order must be "asc" or "desc"'
      );
    }
  }

  // Price filter validation
  if (
    criteria.filters?.priceMin !== undefined &&
    criteria.filters.priceMin < 0
  ) {
    throw new DomainError(
      "INVALID_PRICE_MIN",
      "Minimum price cannot be negative"
    );
  }
  if (
    criteria.filters?.priceMax !== undefined &&
    criteria.filters.priceMax < 0
  ) {
    throw new DomainError(
      "INVALID_PRICE_MAX",
      "Maximum price cannot be negative"
    );
  }
  if (
    criteria.filters?.priceMin !== undefined &&
    criteria.filters?.priceMax !== undefined &&
    criteria.filters.priceMin > criteria.filters.priceMax
  ) {
    throw new DomainError(
      "INVALID_PRICE_RANGE",
      "Minimum price cannot be greater than maximum price"
    );
  }
}
