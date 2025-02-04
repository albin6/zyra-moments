import { Request, Response } from "express";
import { IJoinCategoryRequestController } from "../../../entities/controllerInterfaces/vendor/join-category-request-controller.inteface";
import { IJoinCategoryRequestUseCase } from "../../../entities/useCaseInterfaces/vendor/join-category-request-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class JoinCategoryController implements IJoinCategoryRequestController {
  constructor(
    @inject("IJoinCategoryRequestUseCase")
    private joinCategoryRequestUseCase: IJoinCategoryRequestUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.body;
      const vendorId = (req as CustomRequest).user.id;
      await this.joinCategoryRequestUseCase.execute(
        vendorId as any,
        categoryId
      );
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.ACTION_SUCCESS });
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
