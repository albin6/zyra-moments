import { Request, Response } from "express";
import { IUpdateClientPasswordController } from "../../../entities/controllerInterfaces/client/update-client-password-controller.interface";
import { IUpdateClientPasswordUseCase } from "../../../entities/useCaseInterfaces/client/update-client-password-usecase.interface";
import { inject, injectable } from "tsyringe";
import { ZodError } from "zod";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class UpdateClientPasswordController
  implements IUpdateClientPasswordController
{
  constructor(
    @inject("IUpdateClientPasswordUseCase")
    private updateClientPasswordUseCase: IUpdateClientPasswordUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = (req as CustomRequest).user.id;
      const { currentPassword, newPassword } = req.body as {
        currentPassword: string;
        newPassword: string;
      };

      await this.updateClientPasswordUseCase.execute(
        id,
        currentPassword,
        newPassword
      );

      res
        .status(200)
        .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
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
