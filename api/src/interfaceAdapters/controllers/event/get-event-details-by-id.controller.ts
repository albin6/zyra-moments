import { Request, Response } from "express";
import { IGetEventDetailsByIdController } from "../../../entities/controllerInterfaces/event/get-event-details-by-id-controller.interface";
import { IGetEventDetailsByIdUseCase } from "../../../entities/useCaseInterfaces/event/get-event-details-by-id-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
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
    try {
      const eventId = req.query.eventId;

      const event = await this.getEventDetailsByIdUseCase.execute(eventId);

      res.status(HTTP_STATUS.OK).json({ success: true, event });
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
