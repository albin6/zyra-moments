import { Request, Response } from "express";
import { IUpdateUserStatusController } from "../../../entities/controllerInterfaces/admin/update-user-status-controller.interface";
import { IUpdateUserStatusUseCase } from "../../../entities/useCaseInterfaces/admin/update-user-status-usecase.interface";
import { inject, injectable } from "tsyringe";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";

@injectable()
export class UpdateUserStatusController implements IUpdateUserStatusController {
  constructor(
    @inject("IUpdateUserStatusUseCase")
    private updateUserStatusUseCase: IUpdateUserStatusUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userType, userId } = req.query as {
        userType: string;
        userId: any;
      };

      await this.updateUserStatusUseCase.execute(userType, userId);

      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Validation failed",
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
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
}
