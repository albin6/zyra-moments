import { IDashboardStatsEntity } from "../../models/dashboard-stats.entity";

export interface IGetDashboardStatsUseCase {
  execute(): Promise<IDashboardStatsEntity>;
}
