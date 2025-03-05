import { Request, Response } from "express";
import { ICreateTicketController } from "../../../../entities/controllerInterfaces/event/ticket/create-ticket-controller.interface";
import { ICreateTicketUseCase } from "../../../../entities/useCaseInterfaces/event/ticket/create-ticket-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../../shared/constants";
import { CustomError } from "../../../../entities/utils/CustomError";
import { IQrCodeService } from "../../../../entities/services/qr-code-service.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateTicketController implements ICreateTicketController {
  constructor(
    @inject("ICreateTicketUseCase")
    private createTicketUseCase: ICreateTicketUseCase,
    @inject("IQrCodeService") private qrCodeService: IQrCodeService
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { eventId, userId } = req.body;

      const ticket = await this.createTicketUseCase.execute(eventId, userId);

      const qrCodeImage = await this.qrCodeService.generateQRCodeImage(
        ticket.qrCode
      );

      res.status(HTTP_STATUS.CREATED).json({
        ticket,
        qrCodeImage,
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
