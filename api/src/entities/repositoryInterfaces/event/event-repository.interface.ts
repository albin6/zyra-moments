import { IEventEntity, PaginatedEvents } from "../../models/event.entity";

export interface IEventRepository {
  save(data: IEventEntity): Promise<void>;
  findAllEventsByHostId(
    hostId: any,
    skip: number,
    limit: number
  ): Promise<PaginatedEvents>;
}
