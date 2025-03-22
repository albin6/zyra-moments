import { inject, injectable } from "tsyringe";
import { IUpdateFundReleaseRequestStatusController } from "../../../../entities/controllerInterfaces/event/fund-release/update-fund-release-request-status-controller.interface";
import { IUpdateFundReleaseRequestStatusUseCase } from "../../../../entities/useCaseInterfaces/event/fund-release/update-fund-release-request-status-usecase.inteface";
import { Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../../shared/constants";

@injectable()
export class UpdateFundReleaseRequestStatusController
  implements IUpdateFundReleaseRequestStatusController
{
  constructor(
    @inject("IUpdateFundReleaseRequestStatusUseCase")
    private updateFundReleaseRequestStatusUseCase: IUpdateFundReleaseRequestStatusUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { requestId } = req.params;
    const { status = "APPROVED" } = req.body;

    const updatedRequest =
      await this.updateFundReleaseRequestStatusUseCase.execute(
        requestId,
        status,
      );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: updatedRequest,
      message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
    });
  }
}
