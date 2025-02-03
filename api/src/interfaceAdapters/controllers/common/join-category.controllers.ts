import { Request, Response } from "express";
import { IJoinCategoryController } from "../../../entities/controllerInterfaces/common/join-category-controller.inteface";
import { IJoinCategoryUseCase } from "../../../entities/useCaseInterfaces/common/join-category-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class JoinCategoryController implements IJoinCategoryController {
  constructor(
    @inject("IJoinCategoryUseCase")
    private joinCategoryUseCase: IJoinCategoryUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.body;
      const vendorId = (req as CustomRequest).user.id;
      await this.joinCategoryUseCase.execute(vendorId as any, categoryId);
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
