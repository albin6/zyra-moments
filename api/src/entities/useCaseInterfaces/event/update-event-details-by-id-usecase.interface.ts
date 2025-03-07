import { IEventEntity } from "../../models/event.entity";

export interface IUpdateEventDetailsByIdUseCase {
  execute(id: any, data: Partial<IEventEntity>): Promise<void>;
}
