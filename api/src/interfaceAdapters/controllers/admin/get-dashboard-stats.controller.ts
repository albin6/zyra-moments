import { Request, Response } from "express";
import { IGetDashboardStatsController } from "../../../entities/controllerInterfaces/admin/get-dashboard-stats-controller.interface";
import { IGetDashboardStatsUseCase } from "../../../entities/useCaseInterfaces/admin/get-dashboard-stats-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetDashboardStatsController
  implements IGetDashboardStatsController
{
  constructor(
    @inject("IGetDashboardStatsUseCase")
    private getDashboardStatsUseCase: IGetDashboardStatsUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const stats = await this.getDashboardStatsUseCase.execute();
    res.status(HTTP_STATUS.OK).json({
      success: true,
      stats,
    });
  }
}
