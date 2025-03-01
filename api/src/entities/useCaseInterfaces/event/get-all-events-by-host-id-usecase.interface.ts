import { PaginatedEvents } from "../../models/event.entity";

export interface IGetAllEventsByHostIdUseCase {
  execute(
    hostId: any,
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatedEvents>;
}
