import { IReviewModel } from "../../../frameworks/database/models/review.model";

export interface ICreateReviewUseCase {
  execute(data: {
    bookingId: string;
    clientId: string;
    vendorId: string;
    rating: number;
    comment?: string;
  }): Promise<IReviewModel>;
}
