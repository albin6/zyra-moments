import { Request, Response } from "express";
import { IGetVendorsUnderCategoryController } from "../../../entities/controllerInterfaces/client/get-vendors-under-category-controller.interface";
import { IGetVendorsUnderCategoryUseCase } from "../../../entities/useCaseInterfaces/client/get-vendors-under-category-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVendorsUnderCategoryController
  implements IGetVendorsUnderCategoryController
{
  constructor(
    @inject("IGetVendorsUnderCategoryUseCase")
    private getVendorsUnderCategoryUseCase: IGetVendorsUnderCategoryUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "rating_high_to_low",
    } = req.query;

    const categoryId = req.params.categoryId;

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const searchTermString = typeof search === "string" ? search : "";
    const sortByString =
      typeof sortBy === "string" ? sortBy : "rating_high_to_low";
    const categoryIdString = typeof categoryId === "string" ? categoryId : "";

    if (!categoryIdString) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Category ID is required",
      });
      return;
    }

    const { vendors, total } =
      await this.getVendorsUnderCategoryUseCase.execute(
        pageNumber,
        pageSize,
        searchTermString,
        sortByString,
        categoryIdString
      );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      vendors,
      totalPages: total,
      currentPage: pageNumber,
    });
  }
}
