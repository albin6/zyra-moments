import { injectable } from "tsyringe";
import {
  IEventEntity,
  PaginatedEvents,
  PopulatedEvents,
} from "../../../entities/models/event.entity";
import { IEventRepository } from "../../../entities/repositoryInterfaces/event/event-repository.interface";
import { EventModel } from "../../../frameworks/database/models/event.model";

@injectable()
export class EventRepository implements IEventRepository {
  async save(data: IEventEntity): Promise<void> {
    await EventModel.create(data);
  }

  async findAllEventsByHostId(hostId: any): Promise<PaginatedEvents> {
    const [events, total] = await Promise.all([
      EventModel.find({ hostId }).populate({
        path: "hostId",
        select: "firstName lastName email profileImage phoneNumber",
      }),
      EventModel.countDocuments({ hostId }),
    ]);

    return {
      events: events as unknown as PopulatedEvents[],
      total,
    };
  }
}
