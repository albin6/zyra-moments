import { inject, injectable } from "tsyringe";
import { IEventRepository } from "../../../entities/repositoryInterfaces/event/event-repository.interface";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { IMarkAttendanceUseCase } from "../../../entities/useCaseInterfaces/event/ticket/mark-attendance-usecase.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class MarkAttendanceUseCase implements IMarkAttendanceUseCase {
  constructor(
    @inject("ITicketRepository") private ticketRepository: ITicketRepository,
    @inject("IEventRepository") private eventRepository: IEventRepository
  ) {}

  async execute(
    userId: any,
    qrCode: string
  ): Promise<{ success: boolean; message: string }> {
    // Find ticket by QR code
    const ticket = await this.ticketRepository.findByQRCode(qrCode);

    if (!ticket) {
      return { success: false, message: "Invalid ticket" };
    }

    const isEventHostedByTheRequestedUser =
      await this.eventRepository.findEventByHostAndEventId(
        ticket.eventId,
        userId
      );

    if (!isEventHostedByTheRequestedUser) {
      throw new CustomError(
        ERROR_MESSAGES.NOT_ABLE_TO_MARK_ATTENDANCE,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Check event validity
    const event = await this.eventRepository.findById(ticket.eventId);

    if (!event || event.date < new Date()) {
      return { success: false, message: "Event is not active" };
    }

    if (ticket.status === "USED") {
      return { success: false, message: "Ticket already used" };
    }

    // Mark ticket as used
    await this.ticketRepository.markAsUsed(ticket._id!.toString());

    return {
      success: true,
      message: "Attendance marked successfully",
    };
  }
}
