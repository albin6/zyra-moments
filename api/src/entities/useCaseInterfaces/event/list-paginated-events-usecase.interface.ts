import {
  EventListDto,
  EventListResponseDto,
} from "../../../shared/dtos/event.dto";

export interface IListPaginatedEventsUseCase {
  execute(criteria: EventListDto): Promise<EventListResponseDto>;
}
