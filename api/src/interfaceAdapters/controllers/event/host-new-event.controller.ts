import { Request, Response } from "express";
import { IHostNewEventController } from "../../../entities/controllerInterfaces/event/host-new-event-controller.interface";
import { IHostNewEventUseCase } from "../../../entities/useCaseInterfaces/event/host-new-event-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { IEventEntity } from "../../../entities/models/event.entity";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class HostNewEventController implements IHostNewEventController {
  constructor(
    @inject("IHostNewEventUseCase")
    private hostNewEventUseCase: IHostNewEventUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const eventData = req.body as Omit<IEventEntity, "hostId">;
    const userId = (req as CustomRequest).user.id;

    const roundedData: IEventEntity = {
      ...eventData,
      hostId: userId,
    };

    await this.hostNewEventUseCase.execute(roundedData);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.CREATED });
  }
}
