import { injectable } from "tsyringe";
import {
  IReviewEntity,
  PopulatedReview,
  ReviewListFromRepo,
} from "../../../entities/models/review.entity";
import { IReviewRepository } from "../../../entities/repositoryInterfaces/review/review-repository.interface";
import {
  IReviewModel,
  ReviewModel,
} from "../../../frameworks/database/models/review.model";

@injectable()
export class ReviewRepository implements IReviewRepository {
  async create(review: IReviewEntity): Promise<IReviewModel> {
    return await ReviewModel.create(review);
  }

  async findByVendorId(vendorId: any): Promise<IReviewModel[]> {
    return await ReviewModel.find({ vendorId }).exec();
  }

  async findByClientAndVendor(
    clientId: any,
    vendorId: any
  ): Promise<IReviewModel | null> {
    return await ReviewModel.findOne({ clientId, vendorId }).exec();
  }

  async find(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<ReviewListFromRepo> {
    const [reviews, total] = await Promise.all([
      ReviewModel.find(filter).populate("bookingId").populate('vendorId').populate('clientId').sort(sort).skip(skip).limit(limit),
      ReviewModel.countDocuments(filter),
    ]);
    return {
      reviews: reviews as unknown as PopulatedReview[],
      total,
    };
  }
}
