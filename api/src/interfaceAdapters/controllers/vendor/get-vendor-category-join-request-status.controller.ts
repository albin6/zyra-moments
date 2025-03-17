import { Request, Response } from "express";
import { IGetVendorCategoryJoinRequestStatusController } from "../../../entities/controllerInterfaces/vendor/get-vendor-category-join-request-status-controller.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { IGetVendorCategoryJoinRequestStatusUseCase } from "../../../entities/useCaseInterfaces/vendor/get-vendor-category-join-request-status-usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVendorCategoryJoinRequestStatusController
  implements IGetVendorCategoryJoinRequestStatusController
{
  constructor(
    @inject("IGetVendorCategoryJoinRequestStatusUseCase")
    private getVendorCategoryRequestStatusUseCase: IGetVendorCategoryJoinRequestStatusUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const vendorId = (req as CustomRequest).user.id;

    const status = await this.getVendorCategoryRequestStatusUseCase.execute(
      vendorId
    );

    res.status(HTTP_STATUS.OK).json({ success: true, status });
  }
}
