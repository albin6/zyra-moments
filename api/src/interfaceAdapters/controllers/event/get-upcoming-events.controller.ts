import { Request, Response } from "express";
import { IGetUpcomingEventsController } from "../../../entities/controllerInterfaces/event/get-upcoming-events-controller.interface";
import { IGetUpcomingEventsUseCase } from "../../../entities/useCaseInterfaces/event/get-upcoming-events-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetUpcomingEventsController
  implements IGetUpcomingEventsController
{
  constructor(
    @inject("IGetUpcomingEventsUseCase")
    private getUpcomingEventsUseCase: IGetUpcomingEventsUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const events = await this.getUpcomingEventsUseCase.execute();
    res.status(HTTP_STATUS.OK).json({ success: true, events });
  }
}
