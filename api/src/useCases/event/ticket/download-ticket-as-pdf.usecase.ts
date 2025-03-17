import { inject, injectable } from "tsyringe";
import { DownloadTicketPDFResponse } from "../../../entities/models/download-ticket-as-pdf-response.entity";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { IDownloadTicketAsPdfUseCase } from "../../../entities/useCaseInterfaces/event/ticket/download-ticket-as-pdf-usecase.inteface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { IQrCodeService } from "../../../entities/services/qr-code-service.interface";

@injectable()
export class DownloadTicketAsPdfUseCase implements IDownloadTicketAsPdfUseCase {
  constructor(
    @inject("ITicketRepository") private ticketRepository: ITicketRepository,
    @inject("IQrCodeService") private qrCodeService: IQrCodeService
  ) {}
  async execute(ticketId: string): Promise<DownloadTicketPDFResponse> {
    const ticket = await this.ticketRepository.findByTicketId(ticketId);

    if (!ticket) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }

    const user = ticket.userId as any;
    const event = ticket.eventId as any;

    if (!user || !event) {
      throw new CustomError(
        ERROR_MESSAGES.INCOMPLETE_INFO,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const pdfBuffer = await this.qrCodeService.generateQRCodePDF(
      ticket.qrCode,
      {
        ticketId: ticket.ticketId,
        eventName: event.title,
        userName: `${user.firstName} ${user.lastName}`,
        eventDate: event.date
          ? new Date(event.date).toLocaleDateString()
          : undefined,
        eventLocation: event.eventLocation,
      }
    );

    return {
      pdfBuffer,
      fileName: `ticket-${ticket.ticketId}.pdf`,
    };
  }
}
