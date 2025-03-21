import { IReviewModel } from "../../../frameworks/database/models/review.model";
import { IReviewEntity, ReviewListFromRepo } from "../../models/review.entity";

export interface IReviewRepository {
  create(review: IReviewEntity): Promise<IReviewModel>;

  findByVendorId(vendorId: any): Promise<IReviewModel[]>;

  findByClientAndVendor(
    clientId: any,
    vendorId: any
  ): Promise<IReviewModel | null>;

  find(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<ReviewListFromRepo>;
}
