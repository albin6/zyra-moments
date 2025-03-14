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
      nearby = false, // New: Geospatial flag
      longitude, // New: User's longitude
      latitude, // New: User's latitude
      maxDistance = 10000, // New: Default 10km in meters
    } = criteria;

    let baseQuery: mongoose.FilterQuery<Event> = {
      date: { $gte: new Date() }, // Uncommented this line
    };
    
    // Add geospatial query if nearby is enabled
    if (nearby && longitude !== undefined && latitude !== undefined) {
      baseQuery["coordinates.coordinates"] = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude], // [lng, lat] as per GeoJSON
          },
          $maxDistance: maxDistance, // Distance in meters
        }
      };
    }

    // Add search conditions (applied even with nearby)
    if (search) {
      baseQuery.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { eventLocation: { $regex: search, $options: "i" } },
      ];
    }

    // Add location filter (string-based, only if nearby is false)
    if (!nearby && filters.location) {
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
    // When nearby is true, proximity is implicit, but we can still sort by other fields
    const sortOptions: { [key: string]: 1 | -1 } = nearby
      ? { [sort.field]: sort.order === "asc" ? 1 : -1 } // Preserve secondary sort
      : { [sort.field]: sort.order === "asc" ? 1 : -1 };

    // Calculate pagination
    const skip = (page - 1) * limit;

    console.dir(baseQuery, { depth: null });

    // Execute query
    const events = await EventModel.find(baseQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate<{ hostId: PopulatedEvents["hostId"] }>({
        path: "hostId",
        select: "_id firstName lastName email profileImage phoneNumber",
      })
      .lean()
      .exec();

      console.log('after performing db operation => ', events)

    // Count total events
    const totalEvents = (await EventModel.find(baseQuery)).length

    console.log('after getting total events,=>', totalEvents)

    return {
      events: events as PopulatedEvents[], // Type assertion to match PopulatedEvents
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
