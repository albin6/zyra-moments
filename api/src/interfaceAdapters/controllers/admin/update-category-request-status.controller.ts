import { Request, Response } from "express";
import { IUpdateCategoryRequestStatusController } from "../../../entities/controllerInterfaces/admin/update-category-request-status-controller.interface";
import { IUpdateCategoryRequestStatusUseCase } from "../../../entities/useCaseInterfaces/admin/update-category-request-status-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateCategoryRequestStatusController
  implements IUpdateCategoryRequestStatusController
{
  constructor(
    @inject("IUpdateCategoryRequestStatusUseCase")
    private updateCategoryRequestStatusUseCase: IUpdateCategoryRequestStatusUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { requestId, status } = req.query as {
      requestId: any;
      status: string;
    };

    await this.updateCategoryRequestStatusUseCase.execute(requestId, status);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }
}
