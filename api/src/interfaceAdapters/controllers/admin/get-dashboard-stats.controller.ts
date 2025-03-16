import { Request, Response } from "express";
import { IGetDashboardStatsController } from "../../../entities/controllerInterfaces/admin/get-dashboard-stats-controller.interface";
import { IGetDashboardStatsUseCase } from "../../../entities/useCaseInterfaces/admin/get-dashboard-stats-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
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
    try {
      const stats = await this.getDashboardStatsUseCase.execute();
      res.status(HTTP_STATUS.OK).json({
        success: true,
        stats,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors,
        });
        return;
      }
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
        return;
      }
      console.log(error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
