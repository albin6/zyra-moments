import { Schema } from "mongoose";
import { IReviewModel } from "../models/review.model";

export const reviewSchema = new Schema<IReviewModel>(
    {
      reviewId: { type: String, required: true, unique: true },
      clientId: { 
        type: Schema.Types.ObjectId, 
        ref: "Client", 
        required: true, 
        index: true 
      }, 
      bookingId: { 
        type: Schema.Types.ObjectId, 
        ref: "Booking", 
        required: true, 
        index: true 
      }, 
      vendorId: { 
        type: Schema.Types.ObjectId, 
        ref: "Vendor", 
        required: true, 
        index: true 
      },
      rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
      },
      comment: { 
        type: String, 
        trim: true, 
        maxlength: 500
      },
    },
    {
      timestamps: true,
    }
  );
  
  reviewSchema.index({ vendorId: 1, createdAt: -1 });
  reviewSchema.index({ clientId: 1, vendorId: 1 }, { unique: true });