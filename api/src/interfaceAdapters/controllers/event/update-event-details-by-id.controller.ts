import { Request, Response } from "express";
import { IUpdateEventDetailsByIdController } from "../../../entities/controllerInterfaces/event/update-event-details-by-id-controller.interface";
import { IUpdateEventDetailsByIdUseCase } from "../../../entities/useCaseInterfaces/event/update-event-details-by-id-usecase.interface";
import { ZodError } from "zod";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
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
    try {
      const { eventId, eventData } = req.body;

      console.log(req.body);

      await this.updateEventDetailsByIdUseCase.execute(eventId, eventData);

      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
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
