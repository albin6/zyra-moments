import { injectable } from "tsyringe";
import { ITicketEntity } from "../../../entities/models/ticket.entity";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { ITicketModel, TicketModel } from "../../../frameworks/database/models/ticket.model";
import {
  AttendanceItem,
  GetEventAttendanceResponse,
} from "../../../entities/models/attendance.entity";
import { EventModel } from "../../../frameworks/database/models/event.model";
import mongoose from "mongoose";
import { CustomError } from "../../../entities/utils/custom-error";
import {
  PaginatedTicket,
  PopulatedTicket,
} from "../../../entities/models/paginated-ticket..entity";

@injectable()
export class TicketRepository implements ITicketRepository {
  async create(ticket: ITicketEntity): Promise<ITicketEntity> {
    return await TicketModel.create(ticket);
  }

  async findByTicketId(ticketId: any): Promise<ITicketEntity | null> {
    return await TicketModel.findById(ticketId)
      .populate("userId")
      .populate("eventId");
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

  async getEventAttendance(
    eventId: any,
    hostId: any
  ): Promise<GetEventAttendanceResponse> {
    const event = await EventModel.findOne({ _id: eventId, hostId });
    if (!event) {
      throw new Error("Event not found or unauthorized");
    }

    // Get all tickets for the event with client information
    const tickets = await TicketModel.aggregate([
      { $match: { eventId: new mongoose.Types.ObjectId(eventId) } },
      {
        $lookup: {
          from: "clients",
          localField: "userId",
          foreignField: "_id",
          as: "client",
        },
      },
      { $unwind: "$client" },
      {
        $project: {
          ticketId: 1,
          userId: "$userId",
          firstName: "$client.firstName",
          lastName: "$client.lastName",
          email: "$client.email",
          isScanned: 1,
          scannedAt: 1,
          status: 1,
        },
      },
    ]);

    if (!tickets.length) {
      throw new CustomError("No tickets found for this event", 400);
    }

    const attendance: AttendanceItem[] = tickets.map((ticket) => ({
      ticketId: ticket.ticketId,
      userId: ticket.userId,
      firstName: ticket.firstName,
      lastName: ticket.lastName,
      email: ticket.email,
      isScanned: ticket.isScanned,
      scannedAt: ticket.scannedAt,
      status: ticket.status,
    }));

    return {
      eventId: eventId,
      title: event.title,
      date: event.date,
      attendance,
      totalTickets: attendance.length,
      scannedTickets: attendance.filter((t) => t.isScanned).length,
    };
  }

  async findAllByUserId(
    userId: any,
    skip: number,
    limit: number
  ): Promise<PaginatedTicket> {
    const [tickets, total] = await Promise.all([
      TicketModel.find({ userId })
        .populate(
          "eventId",
          "title description date pricePerTicket ticketLimit eventLocation startTime endTime"
        )
        .skip(skip)
        .limit(limit),
      TicketModel.countDocuments({ userId }),
    ]);
    return {
      total,
      tickets: tickets as unknown as PopulatedTicket[],
    };
  }

  async findByIdAndCancel(id: any): Promise<ITicketModel | null> {
    return await TicketModel.findByIdAndUpdate(id, { status: "CANCELLED" }, {new : true});
  }

  async findByIdAndPopulateEvent(ticketId: any): Promise<any> {
      return await TicketModel.findById(ticketId).populate('eventId')
  }
}
