import { injectable } from "tsyringe";
import { ITicketEntity } from "../../../entities/models/ticket.entity";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { TicketModel } from "../../../frameworks/database/models/ticket.model";

@injectable()
export class TicketRepository implements ITicketRepository {
  async create(ticket: ITicketEntity): Promise<ITicketEntity> {
    return await TicketModel.create(ticket);
  }

  async findByTicketId(ticketId: string): Promise<ITicketEntity | null> {
    try {
      return await TicketModel.findOne({ ticketId })
        .populate("userId")
        .populate("eventId");
    } catch (error) {
      throw new Error(
        `Error finding ticket by ticketId: ${(error as Error).message}`
      );
    }
  }

  async findByQRCode(qrCode: string): Promise<ITicketEntity | null> {
    return await TicketModel.findOne({ qrCode }).lean();
  }
  async markAsUsed(ticketId: string): Promise<ITicketEntity | null> {
    return await TicketModel.findByIdAndUpdate(
      ticketId,
      {
        status: "USED",
        scannedAt: new Date(),
        isScanned: true,
      },
      { new: true }
    ).lean();
  }
}
