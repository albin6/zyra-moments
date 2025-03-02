import { PopulatedEvents } from "../../models/event.entity";

export interface IGetEventDetailsByIdUseCase {
  execute(id: any): Promise<PopulatedEvents | null>;
}
