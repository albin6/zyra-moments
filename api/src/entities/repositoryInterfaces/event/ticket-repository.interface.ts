import { ITicketModel } from "../../../frameworks/database/models/ticket.model";
import { GetEventAttendanceResponse } from "../../models/attendance.entity";
import { PaginatedTicket } from "../../models/paginated-ticket..entity";
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

  findAllByUserId(
    userId: any,
    skip: number,
    limit: number
  ): Promise<PaginatedTicket>;

  findByIdAndCancel(id: any): Promise<ITicketModel | null>

  findByIdAndPopulateEvent(ticketId: any): Promise<any>

  findActiveTicketsByEventId(eventId: string): Promise<ITicketModel[]>;
}
