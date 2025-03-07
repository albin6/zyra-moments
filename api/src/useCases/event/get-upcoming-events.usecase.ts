import { inject, injectable } from "tsyringe";
import { PopulatedEvents } from "../../entities/models/event.entity";
import { IEventRepository } from "../../entities/repositoryInterfaces/event/event-repository.interface";
import { IGetUpcomingEventsUseCase } from "../../entities/useCaseInterfaces/event/get-upcoming-events-usecase.interface";

@injectable()
export class GetUpcomingEventsUseCase implements IGetUpcomingEventsUseCase {
  constructor(
    @inject("IEventRepository") private eventRepository: IEventRepository
  ) {}
  async execute(): Promise<PopulatedEvents[]> {
    return await this.eventRepository.findFew();
  }
}
