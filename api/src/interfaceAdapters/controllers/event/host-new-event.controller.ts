import { Request, Response } from "express";
import { IHostNewEventController } from "../../../entities/controllerInterfaces/event/host-new-event-controller.interface";
import { IHostNewEventUseCase } from "../../../entities/useCaseInterfaces/event/host-new-event-usecase.interface";
import { ZodError } from "zod";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { IEventEntity } from "../../../entities/models/event.entity";
import { inject, injectable } from "tsyringe";

@injectable()
export class HostNewEventController implements IHostNewEventController {
  constructor(
    @inject("IHostNewEventUseCase")
    private hostNewEventUseCase: IHostNewEventUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const eventData = req.body as IEventEntity;

      await this.hostNewEventUseCase.execute(eventData);

      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.CREATED });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors,
        });
        return;
      }
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
        return;
      }
      console.log(error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
