import { inject, injectable } from "tsyringe";
import { IReviewRepository } from "../../entities/repositoryInterfaces/review/review-repository.interface";
import { ICreateReviewUseCase } from "../../entities/useCaseInterfaces/review/create-revew-usecase.interface";
import { IReviewModel } from "../../frameworks/database/models/review.model";
import { IReviewEntity } from "../../entities/models/review.entity";
import { generateRandomUUID } from "../../frameworks/security/randomid.bcrypt";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class CreateReviewUseCase implements ICreateReviewUseCase {
  constructor(
    @inject("IReviewRepository") private reviewRepository: IReviewRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}

  async execute(data: {
    clientId: string;
    vendorId: string;
    rating: number;
    comment?: string;
  }): Promise<IReviewModel> {
    const existingReview = await this.reviewRepository.findByClientAndVendor(
      data.clientId,
      data.vendorId
    );
    if (existingReview) {
      throw new CustomError(ERROR_MESSAGES.ALREADY_REVIEWED, HTTP_STATUS.CONFLICT);
    }

    const review: IReviewEntity = {
      reviewId: generateRandomUUID(),
      clientId: data.clientId,
      vendorId: data.vendorId,
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const savedReview = await this.reviewRepository.create(review);

    await this.updateVendorRating(data.vendorId);

    return savedReview;
  }

  private async updateVendorRating(vendorId: string) {
    const reviews = await this.reviewRepository.findByVendorId(vendorId);
    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews ||
      0;

    await this.vendorRepository.update(vendorId, {
      averageRating,
      totalReviews,
    });
  }
}
