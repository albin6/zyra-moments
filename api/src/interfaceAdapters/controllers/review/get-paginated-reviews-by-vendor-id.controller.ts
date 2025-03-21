import { inject, injectable } from "tsyringe";
import { IGetPaginatedReviewsByVendorIdController } from "../../../entities/controllerInterfaces/review/get-paginated-reviews-by-vendor-id-controller.inteface";
import { IGetPaginatedReviewsByVendorIdUseCase } from "../../../entities/useCaseInterfaces/review/get-paginated-reviews-by-vendor-id-usecase.interface";
import { Request, Response } from "express";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class GetPaginatedReviewsByVendorIdController
  implements IGetPaginatedReviewsByVendorIdController
{
  constructor(
    @inject("IGetPaginatedReviewsByVendorIdUseCase")
    private getPaginatedReviewsByVendorIdUseCase: IGetPaginatedReviewsByVendorIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 10, sortBy = "newest", vendorId } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const sortByString = typeof sortBy === "string" ? sortBy : "";

    const { reviews, total } =
      await this.getPaginatedReviewsByVendorIdUseCase.execute(
        vendorId,
        pageNumber,
        pageSize,
        sortByString
      );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      reviews,
      totalPages: total,
      currentPage: pageNumber,
    });
  }
}
