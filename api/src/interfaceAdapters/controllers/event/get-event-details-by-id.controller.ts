import { Request, Response } from "express";
import { IGetEventDetailsByIdController } from "../../../entities/controllerInterfaces/event/get-event-details-by-id-controller.interface";
import { IGetEventDetailsByIdUseCase } from "../../../entities/useCaseInterfaces/event/get-event-details-by-id-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetEventDetailsByIdController
  implements IGetEventDetailsByIdController
{
  constructor(
    @inject("IGetEventDetailsByIdUseCase")
    private getEventDetailsByIdUseCase: IGetEventDetailsByIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const eventId = req.query.eventId;

    const event = await this.getEventDetailsByIdUseCase.execute(eventId);

    res.status(HTTP_STATUS.OK).json({ success: true, event });
  }
}
