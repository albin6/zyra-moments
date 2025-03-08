import { Request, Response } from "express";
import { IGetEventAttendanceController } from "../../../entities/controllerInterfaces/event/get-event-attendance-controller.interface";
import { IGetEventAttendanceUseCase } from "../../../entities/useCaseInterfaces/event/get-event-attendance-usecase.interface";
import { CustomRequest } from "../../middlewares/auth.middleware";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { ZodError } from "zod";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetEventAttendanceController
  implements IGetEventAttendanceController
{
  constructor(
    @inject("IGetEventAttendanceUseCase")
    private getEventAttendanceUseCase: IGetEventAttendanceUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { eventId } = req.params;
      const hostId = (req as CustomRequest).user.id;

      const request = {
        eventId,
        hostId,
      };

      const response = await this.getEventAttendanceUseCase.execute(request);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: response,
        message: SUCCESS_MESSAGES.ATTENDANCE_RETRIEVED,
      });
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
