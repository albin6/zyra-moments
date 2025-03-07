import {
  EventListDto,
  EventListResponseDto,
} from "../../../shared/dtos/event.dto";
import {
  IEventEntity,
  PaginatedEvents,
  PopulatedEvents,
} from "../../models/event.entity";

export interface IEventRepository {
  save(data: IEventEntity): Promise<void>;

  findById(id: any): Promise<IEventEntity | null>;

  findAllEventsByHostId(
    hostId: any,
    skip: number,
    limit: number
  ): Promise<PaginatedEvents>;

  findEventByIdAndUpdate(id: any, data: Partial<IEventEntity>): Promise<void>;

  findEventById(id: any): Promise<PopulatedEvents | null>;

  findFew(): Promise<PopulatedEvents[]>;

  findUpcomingEvents(criteria: EventListDto): Promise<EventListResponseDto>;
}
