import { ReviewListFromRepo } from "../../models/review.entity";

export interface IGetPaginatedReviewsByVendorIdUseCase {
  execute(
    vendorId: any,
    pageNumber: number,
    pageSize: number,
    sortBy: string
  ): Promise<ReviewListFromRepo>;
}
