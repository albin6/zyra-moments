import { Request, Response } from "express";
import { ICancelTicketController } from "../../../../entities/controllerInterfaces/event/ticket/cancel-ticket-controller.interface";
import { ICancelTicketUseCase } from "../../../../entities/useCaseInterfaces/event/ticket/cancel-ticket-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class CancelTicketController implements ICancelTicketController {
  constructor(
    @inject("ICancelTicketUseCase")
    private cancelTicketUseCase: ICancelTicketUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { ticketId } = req.query;

    await this.cancelTicketUseCase.execute(ticketId);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.CANCEL_SUCCESS });
  }
}
