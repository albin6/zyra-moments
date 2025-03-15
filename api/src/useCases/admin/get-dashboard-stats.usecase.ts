import { inject, injectable } from "tsyringe";
import { IDashboardStatsEntity } from "../../entities/models/dashboard-stats.entity";
import { IDashBoardStatsRepository } from "../../entities/repositoryInterfaces/admin/dashboard-stats-repository.interface";
import { IGetDashboardStatsUseCase } from "../../entities/useCaseInterfaces/admin/get-dashboard-stats-usecase.interface";

@injectable()
export class GetDashboardStatsUseCase implements IGetDashboardStatsUseCase {
  constructor(
    @inject("IDashBoardStatsRepository")
    private dashboardStatsRepository: IDashBoardStatsRepository
  ) {}

  async execute(): Promise<IDashboardStatsEntity> {
    const [
      totalActiveEvents,
      totalActiveClients,
      totalActiveVendors,
      totalActiveCategories,
    ] = await Promise.all([
      this.dashboardStatsRepository.getActiveEventsCount(),
      this.dashboardStatsRepository.getActiveClientsCount(),
      this.dashboardStatsRepository.getActiveVendorsCount(),
      this.dashboardStatsRepository.getActiveCategoriesCount(),
    ]);

    return {
      totalActiveEvents,
      totalActiveClients,
      totalActiveVendors,
      totalActiveCategories,
      timestamp: new Date(),
    };
  }
}
