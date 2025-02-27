import { Request, Response } from "express";
import { IUpdateCategoryRequestStatusController } from "../../../entities/controllerInterfaces/admin/update-category-request-status-controller.interface";
import { IUpdateCategoryRequestStatusUseCase } from "../../../entities/useCaseInterfaces/admin/update-category-request-status-usecase.interface";
import { ZodError } from "zod";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
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
    try {
      const { requestId, status } = req.query as {
        requestId: any;
        status: string;
      };

      await this.updateCategoryRequestStatusUseCase.execute(requestId, status);

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
