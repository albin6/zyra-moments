import { Request, Response } from "express";
import { IUpdateClientProfileController } from "../../../entities/controllerInterfaces/client/update-client-profile-controller.interface";
import { IUpdateClientProfileUseCase } from "../../../entities/useCaseInterfaces/client/update-client-profile-usecase.interface";
import { ZodError } from "zod";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { IClientEntity } from "../../../entities/models/client.entity";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateClientProfileController
  implements IUpdateClientProfileController
{
  constructor(
    @inject("IUpdateClientProfileUseCase")
    private updateClientProfileUseCase: IUpdateClientProfileUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const clientId = (req as CustomRequest).user.id;

      const updateData: Partial<IClientEntity> = {};

      const allowedFields: (keyof IClientEntity)[] = [
        "firstName",
        "lastName",
        "phoneNumber",
        "profileImage",
      ];

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      await this.updateClientProfileUseCase.execute(clientId, updateData);

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
