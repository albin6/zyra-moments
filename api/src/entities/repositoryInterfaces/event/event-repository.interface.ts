import { IEventEntity } from "../../models/event.entity";

export interface IEventRepository {
  save(data: IEventEntity): Promise<void>;
}
