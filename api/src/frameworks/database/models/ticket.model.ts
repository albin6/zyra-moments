import { Document, model, ObjectId } from "mongoose";
import { ITicketEntity } from "../../../entities/models/ticket.entity";
import { ticketSchema } from "../schemas/ticket.schema";

export interface ITicketModel extends Omit<ITicketEntity, "_id">, Document {
  _id: ObjectId;
}

export const TicketModel = model<ITicketModel>("Ticket", ticketSchema);
