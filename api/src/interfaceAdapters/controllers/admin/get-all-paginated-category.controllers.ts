import { Request, Response } from "express";
import { IGetAllPaginatedCategoryController } from "../../../entities/controllerInterfaces/admin/get-all-paginated-category-controller.interface";
import { IGetAllPaginatedCategoryUseCase } from "../../../entities/useCaseInterfaces/admin/get-all-paginated-category-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllPaginatedCategoryController
  implements IGetAllPaginatedCategoryController
{
  constructor(
    @inject("IGetAllPaginatedCategoryUseCase")
    private getAllPaginatedCategoryUseCase: IGetAllPaginatedCategoryUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, searchTerm = "" } = req.query;

      const pageNumber = Number(page);
      const pageSize = Number(limit);

      const searchTermString = typeof searchTerm === "string" ? searchTerm : "";

      const { categories, total, all } =
        await this.getAllPaginatedCategoryUseCase.execute(
          pageNumber,
          pageSize,
          searchTermString
        );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        categories,
        totalPages: total,
        currentPage: pageNumber,
        totalCategory: all,
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
