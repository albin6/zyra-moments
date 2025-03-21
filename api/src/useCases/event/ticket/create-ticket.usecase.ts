import { inject, injectable } from "tsyringe";
import { ITicketEntity } from "../../../entities/models/ticket.entity";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { IQrCodeService } from "../../../entities/services/qr-code-service.interface";
import { ICreateTicketUseCase } from "../../../entities/useCaseInterfaces/event/ticket/create-ticket-usecase.interface";
import { generateRandomUUID } from "../../../frameworks/security/randomid.bcrypt";
import { IPaymentRepository } from "../../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class CreateTicketUseCase implements ICreateTicketUseCase {
  constructor(
    @inject("ITicketRepository") private ticketRepository: ITicketRepository,
    @inject("IQrCodeService") private qrCodeService: IQrCodeService,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository
  ) {}
  async execute(eventId: string, userId: string): Promise<ITicketEntity> {
    if (!eventId || !userId) {
      throw new Error("Event ID and User ID are required");
    }

    const qrCode = this.qrCodeService.generateUniqueQRCode(eventId, userId);

    const lastPayment = await this.paymentRepository.findLastPaymentByUserId(
      userId
    );

    if (!lastPayment) {
      throw new CustomError(
        ERROR_MESSAGES.PAYMENT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const ticket: ITicketEntity = {
      paymentId: lastPayment[0]._id as any,
      ticketId: generateRandomUUID(),
      eventId,
      userId,
      qrCode,
      status: "PURCHASED",
      isScanned: false,
    };

    return this.ticketRepository.create(ticket);
  }
}
