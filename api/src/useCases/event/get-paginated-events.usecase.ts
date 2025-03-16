import { inject, injectable } from "tsyringe";
import {
  EventFilterParams,
  PaginatedEvents,
} from "../../entities/models/event.entity";
import { IEventRepository } from "../../entities/repositoryInterfaces/event/event-repository.interface";
import { IGetPaginatedEventsUseCase } from "../../entities/useCaseInterfaces/event/get-paginated-events-usecase.interface";

@injectable()
export class GetPaginatedEventsUseCase implements IGetPaginatedEventsUseCase {
  constructor(
    @inject("IEventRepository") private eventRepository: IEventRepository
  ) {}
  async execute({
    pageNumber,
    pageSize,
    searchString,
    dateValue,
    parsedStatus,
  }: EventFilterParams): Promise<PaginatedEvents> {
    let filter: any = {};

    if (searchString?.trim()) {
      filter.$or = [
        { title: { $regex: searchString, $options: "i" } },
        { description: { $regex: searchString, $options: "i" } },
        { eventLocation: { $regex: searchString, $options: "i" } },
      ];
    }
    if (dateValue) {
      filter.date = dateValue;
    }

    if (parsedStatus === true || parsedStatus === false) {
      filter.status = parsedStatus;
    }

    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const pageLimit = validPageSize;

    const { events, total } = await this.eventRepository.getPaginatedEvents(
      filter,
      skip,
      pageLimit
    );

    const response: PaginatedEvents = {
      events,
      total: Math.ceil(total / validPageSize),
    };

    return response;
  }
}
