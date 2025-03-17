import { inject, injectable } from "tsyringe";
import { PopulatedEvents } from "../../entities/models/event.entity";
import { IEventRepository } from "../../entities/repositoryInterfaces/event/event-repository.interface";
import { IGetEventDetailsByIdUseCase } from "../../entities/useCaseInterfaces/event/get-event-details-by-id-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class GetEventDetailsByIdUseCase implements IGetEventDetailsByIdUseCase {
  constructor(
    @inject("IEventRepository") private eventRepository: IEventRepository
  ) {}
  async execute(id: any): Promise<PopulatedEvents | null> {
    const event = await this.eventRepository.findEventById(id);

    if (!event) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }

    return event;
  }
}
