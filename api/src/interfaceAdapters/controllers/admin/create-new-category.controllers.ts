import { Request, Response } from "express";
import { ICreateNewCategoryController } from "../../../entities/controllerInterfaces/admin/create-new-category-controller.interface";
import { ICreateNewCategoryUseCase } from "../../../entities/useCaseInterfaces/admin/create-new-category-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateNewCategoryController
  implements ICreateNewCategoryController
{
  constructor(
    @inject("ICreateNewCategoryUseCase")
    private createNewCategoryUseCase: ICreateNewCategoryUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.body as { title: string };

      await this.createNewCategoryUseCase.execute(title);

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
