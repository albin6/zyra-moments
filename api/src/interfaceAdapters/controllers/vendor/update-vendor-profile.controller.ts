import { Request, Response } from "express";
import { IUpdateVendorProfileController } from "../../../entities/controllerInterfaces/vendor/update-vendor-profile-controller.interface";
import { IUpdateVendorProfileUseCase } from "../../../entities/useCaseInterfaces/vendor/update-vendor-profile-usecase.interface";
import { ZodError } from "zod";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
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
    try {
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
