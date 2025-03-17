import { Request, Response } from "express";
import { IUpdateEventDetailsByIdController } from "../../../entities/controllerInterfaces/event/update-event-details-by-id-controller.interface";
import { IUpdateEventDetailsByIdUseCase } from "../../../entities/useCaseInterfaces/event/update-event-details-by-id-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateEventDetailsByIdController
  implements IUpdateEventDetailsByIdController
{
  constructor(
    @inject("IUpdateEventDetailsByIdUseCase")
    private updateEventDetailsByIdUseCase: IUpdateEventDetailsByIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { eventId, eventData } = req.body;

    console.log(req.body);

    await this.updateEventDetailsByIdUseCase.execute(eventId, eventData);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }
}
