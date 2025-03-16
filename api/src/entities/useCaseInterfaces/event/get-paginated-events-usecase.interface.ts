import { EventFilterParams, PaginatedEvents } from "../../models/event.entity";

export interface IGetPaginatedEventsUseCase {
  execute(params: EventFilterParams): Promise<PaginatedEvents>;
}
