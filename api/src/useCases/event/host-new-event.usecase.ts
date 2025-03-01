import { inject, injectable } from "tsyringe";
import { IEventEntity } from "../../entities/models/event.entity";
import { IEventRepository } from "../../entities/repositoryInterfaces/event/event-repository.interface";
import { IHostNewEventUseCase } from "../../entities/useCaseInterfaces/event/host-new-event-usecase.interface";

@injectable()
export class HostNewEventUseCase implements IHostNewEventUseCase {
  constructor(
    @inject("IEventRepository") private eventRepository: IEventRepository
  ) {}
  async execute(data: IEventEntity): Promise<void> {
    await this.eventRepository.save(data);
  }
}
