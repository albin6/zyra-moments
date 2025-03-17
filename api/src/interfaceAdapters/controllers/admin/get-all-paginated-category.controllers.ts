import { Request, Response } from "express";
import { IGetAllPaginatedCategoryController } from "../../../entities/controllerInterfaces/admin/get-all-paginated-category-controller.interface";
import { IGetAllPaginatedCategoryUseCase } from "../../../entities/useCaseInterfaces/admin/get-all-paginated-category-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
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
  }
}
