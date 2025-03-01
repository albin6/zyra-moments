import { inject, injectable } from "tsyringe";
import { PaginatedEvents } from "../../entities/models/event.entity";
import { IEventRepository } from "../../entities/repositoryInterfaces/event/event-repository.interface";
import { IGetAllEventsByHostIdUseCase } from "../../entities/useCaseInterfaces/event/get-all-events-by-host-id-usecase.interface";

@injectable()
export class GetAllEventsByHostIdUseCase
  implements IGetAllEventsByHostIdUseCase
{
  constructor(
    @inject("IEventRepository") private eventRepository: IEventRepository
  ) {}
  async execute(
    hostId: any,
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatedEvents> {
    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const limit = validPageSize;

    const { events, total } = await this.eventRepository.findAllEventsByHostId(
      hostId,
      skip,
      limit
    );

    return {
      events,
      total: Math.ceil(total / validPageSize),
    };
  }
}
