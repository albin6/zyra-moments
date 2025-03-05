import { ITicketEntity } from "../../../models/ticket.entity";

export interface ICreateTicketUseCase {
  execute(eventId: string, userId: string): Promise<ITicketEntity>;
}
