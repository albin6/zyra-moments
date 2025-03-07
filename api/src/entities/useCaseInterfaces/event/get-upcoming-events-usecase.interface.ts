import { PopulatedEvents } from "../../models/event.entity";

export interface IGetUpcomingEventsUseCase {
  execute(): Promise<PopulatedEvents[]>;
}
