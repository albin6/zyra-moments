import { inject, injectable } from "tsyringe";
import { IEventRepository } from "../../entities/repositoryInterfaces/event/event-repository.interface";
import { IListPaginatedEventsUseCase } from "../../entities/useCaseInterfaces/event/list-paginated-events-usecase.interface";
import {
  EventListDto,
  EventListResponseDto,
} from "../../shared/dtos/event.dto";
import { validateCriteria } from "../../shared/validations/event.validation";

@injectable()
export class ListPaginatedEventsUseCase implements IListPaginatedEventsUseCase {
  constructor(
    @inject("IEventRepository") private eventRepository: IEventRepository
  ) {}
  async execute(criteria: EventListDto): Promise<EventListResponseDto> {
    validateCriteria(criteria);
    return this.eventRepository.findUpcomingEvents(criteria);
  }
}
