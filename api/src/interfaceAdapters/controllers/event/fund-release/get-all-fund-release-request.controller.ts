import { inject, injectable } from "tsyringe";
import { IGetAllFundReleaseRequestController } from "../../../../entities/controllerInterfaces/event/fund-release/get-all-fund-release-request-controller";
import { Request, Response } from "express";
import { IGetAllFundReleaseRequestUseCase } from "../../../../entities/useCaseInterfaces/event/fund-release/get-all-fund-release-request-usecase.interface";
import { HTTP_STATUS } from "../../../../shared/constants";

@injectable()
export class GetAllFundReleaseRequestController
  implements IGetAllFundReleaseRequestController
{
  constructor(
    @inject("IGetAllFundReleaseRequestUseCase")
    private getAllFundReleaseRequestUseCase: IGetAllFundReleaseRequestUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const requests = await this.getAllFundReleaseRequestUseCase.execute();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: requests,
    });
  }
}
