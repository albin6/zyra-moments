export interface IReviewEntity {
  reviewId: string;
  clientId: string;
  vendorId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
