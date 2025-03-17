import { Request, Response } from "express";
import { IGetVendorDetailsController } from "../../../entities/controllerInterfaces/vendor/get-vendor-details-controller.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { IGetVendorDetailsUseCase } from "../../../entities/useCaseInterfaces/vendor/get-vendor-details-usecase.interface";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVendorDetailsController implements IGetVendorDetailsController {
  constructor(
    @inject("IGetVendorDetailsUseCase")
    private getVendorDetailsUseCase: IGetVendorDetailsUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const vendorId = (req as CustomRequest).user.id;

    const vendor = await this.getVendorDetailsUseCase.execute(vendorId);

    res.status(HTTP_STATUS.OK).json({ success: true, vendor });
  }
}
