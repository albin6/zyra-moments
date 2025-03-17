import { Request, Response } from "express";
import { ICreateTicketController } from "../../../../entities/controllerInterfaces/event/ticket/create-ticket-controller.interface";
import { ICreateTicketUseCase } from "../../../../entities/useCaseInterfaces/event/ticket/create-ticket-usecase.interface";
import { HTTP_STATUS } from "../../../../shared/constants";
import { IQrCodeService } from "../../../../entities/services/qr-code-service.interface";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../../middlewares/auth.middleware";

@injectable()
export class CreateTicketController implements ICreateTicketController {
  constructor(
    @inject("ICreateTicketUseCase")
    private createTicketUseCase: ICreateTicketUseCase,
    @inject("IQrCodeService") private qrCodeService: IQrCodeService
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { eventId } = req.body;
    const userId = (req as CustomRequest).user.id;

    const ticket = await this.createTicketUseCase.execute(eventId, userId);

    const qrCodeImage = await this.qrCodeService.generateQRCodeImage(
      ticket.qrCode
    );

    res.status(HTTP_STATUS.CREATED).json({
      ticket,
      qrCodeImage,
    });
  }
}
