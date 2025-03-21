import { model, ObjectId } from "mongoose";
import { IReviewEntity } from "../../../entities/models/review.entity";
import { reviewSchema } from "../schemas/review.schema";

export interface IReviewModel extends Omit<IReviewEntity, "clientId" | "vendorId" | "bookingId">, Document {
    clientId: ObjectId,
    vendorId: ObjectId,
    bookingId: ObjectId
}

export const ReviewModel = model<IReviewModel>("Review", reviewSchema)