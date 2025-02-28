import { Request, Response } from "express";
import { IUpdateBookingStatusController } from "../../../entities/controllerInterfaces/booking/update-booking-status-controller.interface";
import { IUpdateBookingStatusUseCase } from "../../../entities/useCaseInterfaces/booking/update-booking-status-usecase.interface";
import { ZodError } from "zod";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";
import { ICancelBookingUseCase } from "../../../entities/useCaseInterfaces/booking/cancel-booking-usecase.interface";

@injectable()
export class UpdateBookingStatusController
  implements IUpdateBookingStatusController
{
  constructor(
    @inject("IUpdateBookingStatusUseCase")
    private updateBookingStatusUseCase: IUpdateBookingStatusUseCase,
    @inject("ICancelBookingUseCase")
    private cancelBookingUseCase: ICancelBookingUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { bookingId, status } = req.query;

      if (!bookingId) {
        throw new CustomError(
          ERROR_MESSAGES.ID_REQUIRED,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const statusString = typeof status === "string" ? status : "";

      if (status === "cancelled") {
        await this.cancelBookingUseCase.execute(bookingId);
      } else if (status === "confirmed" || status === "completed") {
        await this.updateBookingStatusUseCase.execute(bookingId, statusString);
      }

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
