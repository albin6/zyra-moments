import { Request, Response } from "express";
import { ICategoryRequestController } from "../../../entities/controllerInterfaces/common/category-request-controller.interface";
import { ICategoryRequestUseCase } from "../../../entities/useCaseInterfaces/common/category-request-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryRequestController implements ICategoryRequestController {
  constructor(
    @inject("ICategoryRequestUseCase")
    private categoryRequestUseCase: ICategoryRequestUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const vendorId = (req as CustomRequest).user.id;
      const { title } = req.body;
      await this.categoryRequestUseCase.exectute(title, vendorId);

      res
        .status(HTTP_STATUS.CREATED)
        .json({ success: true, message: SUCCESS_MESSAGES.OPERATION_SUCCESS });
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
