import { Request, Response } from "express";
import { IUpdateVendorProfileController } from "../../../entities/controllerInterfaces/vendor/update-vendor-profile-controller.interface";
import { IUpdateVendorProfileUseCase } from "../../../entities/useCaseInterfaces/vendor/update-vendor-profile-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { IVendorEntity } from "../../../entities/models/vendor.entity";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateVendorProfileController
  implements IUpdateVendorProfileController
{
  constructor(
    @inject("IUpdateVendorProfileUseCase")
    private updateVendorProfileUseCase: IUpdateVendorProfileUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const vendorId = (req as CustomRequest).user.id;

    const updateData: Partial<IVendorEntity> = {};

    const allowedFields: (keyof IVendorEntity)[] = [
      "firstName",
      "lastName",
      "phoneNumber",
      "bio",
      "place",
      "profileImage",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    await this.updateVendorProfileUseCase.execute(vendorId, updateData);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
    });
  }
}
