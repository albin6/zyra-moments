import { GetEventAttendanceResponse } from "../../models/attendance.entity";
import { ITicketEntity } from "../../models/ticket.entity";

export interface ITicketRepository {
  create(ticket: ITicketEntity): Promise<ITicketEntity>;

  findByTicketId(ticketId: string): Promise<ITicketEntity | null>;

  findByQRCode(qrCode: string): Promise<ITicketEntity | null>;

  markAsUsed(ticketId: string): Promise<ITicketEntity | null>;

  getEventAttendance(
    eventId: any,
    hostId: any
  ): Promise<GetEventAttendanceResponse>;
}
