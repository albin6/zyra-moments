import { ITicketEntity } from "../../models/ticket.entity";

export interface ITicketRepository {
  create(ticket: ITicketEntity): Promise<ITicketEntity>;
  findByTicketId(ticketId: string): Promise<ITicketEntity | null>;
  findByQRCode(qrCode: string): Promise<ITicketEntity | null>;
  markAsUsed(ticketId: string): Promise<ITicketEntity | null>;
}
