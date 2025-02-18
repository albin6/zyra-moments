import { Request, Response } from "express";
import { IGetVendorsUnderCategoryController } from "../../../entities/controllerInterfaces/client/get-vendors-under-category-controller.interface";
import { IGetVendorsUnderCategoryUseCase } from "../../../entities/useCaseInterfaces/client/get-vendors-under-category-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
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
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "rating_high_to_low",
        categoryId,
      } = req.query;

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
