import { IEventEntity } from "../../models/event.entity";

export interface IHostNewEventUseCase {
  execute(data: IEventEntity): Promise<void>;
}
