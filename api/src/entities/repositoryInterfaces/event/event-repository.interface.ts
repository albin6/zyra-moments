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

  findEventById(id: any): Promise<PopulatedEvents | null>;

  findUpcomingEvents(criteria: EventListDto): Promise<EventListResponseDto>;
}
