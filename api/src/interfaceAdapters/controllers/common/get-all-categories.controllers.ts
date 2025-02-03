import { Request, Response } from "express";
import { IGetAllCategoriesController } from "../../../entities/controllerInterfaces/common/get-all-categories-controller.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";
import { IGetAllCategoriesUseCase } from "../../../entities/useCaseInterfaces/common/get-all-categories-usecase.inteface";

@injectable()
export class GetAllCategoriesController implements IGetAllCategoriesController {
  constructor(
    @inject("IGetAllCategoriesUseCase")
    private getAllCategoriesUseCase: IGetAllCategoriesUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.getAllCategoriesUseCase.execute();
      res.status(HTTP_STATUS.OK).json({ success: true, categories });
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
