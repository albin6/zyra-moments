import {
  IEventEntity,
  PaginatedEvents,
  PopulatedEvents,
} from "../../models/event.entity";

export interface IEventRepository {
  save(data: IEventEntity): Promise<void>;

  findAllEventsByHostId(
    hostId: any,
    skip: number,
    limit: number
  ): Promise<PaginatedEvents>;

  findEventById(id: any): Promise<PopulatedEvents | null>;
}
