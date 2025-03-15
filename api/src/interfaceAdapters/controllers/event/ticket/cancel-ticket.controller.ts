import { Request, Response } from "express";
import { ICancelTicketController } from "../../../../entities/controllerInterfaces/event/ticket/cancel-ticket-controller.interface";
import { ICancelTicketUseCase } from "../../../../entities/useCaseInterfaces/event/ticket/cancel-ticket-usecase.interface";
import { ZodError } from "zod";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../../shared/constants";
import { CustomError } from "../../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CancelTicketController implements ICancelTicketController {
  constructor(
    @inject("ICancelTicketUseCase")
    private cancelTicketUseCase: ICancelTicketUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { ticketId } = req.query;

      await this.cancelTicketUseCase.execute(ticketId);

      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.CANCEL_SUCCESS });
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
