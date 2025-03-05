import { inject, injectable } from "tsyringe";
import { ITicketEntity } from "../../../entities/models/ticket.entity";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { IQrCodeService } from "../../../entities/services/qr-code-service.interface";
import { ICreateTicketUseCase } from "../../../entities/useCaseInterfaces/event/ticket/create-ticket-usecase.interface";
import { generateRandomUUID } from "../../../frameworks/security/randomid.bcrypt";

@injectable()
export class CreateTicketUseCase implements ICreateTicketUseCase {
  constructor(
    @inject("ITicketRepository") private ticketRepository: ITicketRepository,
    @inject("IQrCodeService") private qrCodeService: IQrCodeService
  ) {}
  async execute(eventId: string, userId: string): Promise<ITicketEntity> {
    if (!eventId || !userId) {
      throw new Error("Event ID and User ID are required");
    }

    const qrCode = this.qrCodeService.generateUniqueQRCode(eventId, userId);

    const ticket: ITicketEntity = {
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
