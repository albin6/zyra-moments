import { injectable } from "tsyringe";
import {
  IEventEntity,
  PaginatedEvents,
  PopulatedEvents,
} from "../../../entities/models/event.entity";
import { IEventRepository } from "../../../entities/repositoryInterfaces/event/event-repository.interface";
import { EventModel } from "../../../frameworks/database/models/event.model";
import mongoose from "mongoose";
import {
  EventListDto,
  EventListResponseDto,
} from "../../../shared/dtos/event.dto";

@injectable()
export class EventRepository implements IEventRepository {
  async save(data: IEventEntity): Promise<void> {
    await EventModel.create(data);
  }

  async findById(id: any): Promise<IEventEntity | null> {
    return await EventModel.findById(id);
  }

  async findEventByHostAndEventId(
    id: any,
    hostId: any
  ): Promise<IEventEntity | null> {
    return await EventModel.findOne({ _id: id, hostId: hostId });
  }

  async findAllEventsByHostId(
    hostId: any,
    skip: number,
    limit: number
  ): Promise<PaginatedEvents> {
    const [events, total] = await Promise.all([
      EventModel.find({ hostId })
        .populate({
          path: "hostId",
          select: "firstName lastName email profileImage phoneNumber",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      EventModel.countDocuments({ hostId }),
    ]);

    return {
      events: events as unknown as PopulatedEvents[],
      total,
    };
  }

  async findEventById(id: any): Promise<PopulatedEvents | null> {
    return (await EventModel.findById(id).populate({
      path: "hostId",
      select: "firstName lastName email profileImage phoneNumber",
    })) as unknown as PopulatedEvents;
  }

  async findFew(): Promise<PopulatedEvents[]> {
    return (await EventModel.find()
      .populate({
        path: "hostId",
        select: "firstName lastName email profileImage phoneNumber",
      })
      .limit(6)) as unknown as PopulatedEvents[];
  }

  async findUpcomingEvents(
    criteria: EventListDto
  ): Promise<EventListResponseDto> {
    const {
      page = 1,
      limit = 10,
      search = "",
      filters = {},
      sort = { field: "date", order: "asc" },
    } = criteria;

    // Construct base query for upcoming events
    const baseQuery: mongoose.FilterQuery<Event> = {
      date: { $gte: new Date() },
    };

    // Add search conditions
    if (search) {
      baseQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { eventLocation: { $regex: search, $options: "i" } },
      ];
    }

    // Add location filter
    if (filters.location) {
      baseQuery.eventLocation = { $regex: filters.location, $options: "i" };
    }

    // Add price range filter
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      baseQuery.pricePerTicket = {};
      if (filters.priceMin !== undefined) {
        baseQuery.pricePerTicket.$gte = filters.priceMin;
      }
      if (filters.priceMax !== undefined) {
        baseQuery.pricePerTicket.$lte = filters.priceMax;
      }
    }

    // Construct sort object
    const sortOptions: { [key: string]: 1 | -1 } = {
      [sort.field]: sort.order === "asc" ? 1 : -1,
    };

    // Calculate pagination
    const skip = (page - 1) * limit;

    console.log("base query for the data =>", baseQuery);

    // Execute query
    const events = await EventModel.find(baseQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "hostId",
        select: "_id firstName lastName email profileImage phoneNumber",
      });

    // Count total events
    const totalEvents = await EventModel.countDocuments(baseQuery);

    return {
      events: events as any[], // Type assertion to bypass strict typing
      pagination: {
        totalEvents,
        totalPages: Math.ceil(totalEvents / limit),
        currentPage: page,
      },
    };
  }

  async findEventByIdAndUpdate(
    id: any,
    data: Partial<IEventEntity>
  ): Promise<void> {
    await EventModel.findByIdAndUpdate(id, data);
  }
}
