import { inject, injectable } from "tsyringe";
import { IEventEntity } from "../../entities/models/event.entity";
import { IEventRepository } from "../../entities/repositoryInterfaces/event/event-repository.interface";
import { IUpdateEventDetailsByIdUseCase } from "../../entities/useCaseInterfaces/event/update-event-details-by-id-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateEventDetailsByIdUseCase
  implements IUpdateEventDetailsByIdUseCase
{
  constructor(
    @inject("IEventRepository") private eventRepository: IEventRepository
  ) {}
  async execute(id: any, data: Partial<IEventEntity>): Promise<void> {
    if (!id) {
      throw new CustomError(
        ERROR_MESSAGES.ID_NOT_PROVIDED,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await this.eventRepository.findEventByIdAndUpdate(id, data);
  }
}
