import { inject, injectable } from "tsyringe";
import { ReviewListFromRepo } from "../../entities/models/review.entity";
import { IReviewRepository } from "../../entities/repositoryInterfaces/review/review-repository.interface";
import { IGetPaginatedReviewsByVendorIdUseCase } from "../../entities/useCaseInterfaces/review/get-paginated-reviews-by-vendor-id-usecase.interface";

@injectable()
export class GetPaginatedReviewsByVendorIdUseCase
  implements IGetPaginatedReviewsByVendorIdUseCase
{
  constructor(
    @inject("IReviewRepository") private reviewRepository: IReviewRepository
  ) {}
  async execute(
    vendorId: any,
    pageNumber: number,
    pageSize: number,
    sortBy: string
  ): Promise<ReviewListFromRepo> {
    let filter: any = {
      vendorId: vendorId,
    };

    let sortOptions = {};
    switch (sortBy) {
      case "rating-asc":
        sortOptions = { rating: 1 };
        break;
      case "rating-desc":
        sortOptions = { rating: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const limit = validPageSize;

    const { reviews, total } = await this.reviewRepository.find(
      filter,
      sortOptions,
      skip,
      limit
    );

    return {
      reviews,
      total: Math.ceil(total / validPageSize),
    };
  }
}
