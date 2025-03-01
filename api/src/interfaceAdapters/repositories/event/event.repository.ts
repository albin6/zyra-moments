import { injectable } from "tsyringe";
import { IEventEntity } from "../../../entities/models/event.entity";
import { IEventRepository } from "../../../entities/repositoryInterfaces/event/event-repository.interface";
import { EventModel } from "../../../frameworks/database/models/event.model";

@injectable()
export class EventRepository implements IEventRepository {
  async save(data: IEventEntity): Promise<void> {
    await EventModel.create(data);
  }
}
