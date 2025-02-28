import { injectable } from "tsyringe";
import {
  IPaymentEntity,
  PaymentStatus,
} from "../../../entities/models/payment.entity";
import { IPaymentRepository } from "../../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { PaymentModel } from "../../../frameworks/database/models/payment.model";

@injectable()
export class PaymentRepository implements IPaymentRepository {
  async save(payment: Partial<IPaymentEntity>): Promise<IPaymentEntity> {
    return await PaymentModel.create(payment);
  }

  async findByPaymentIntentIdAndUpdateStatus(
    paymentIntentId: string,
    status: PaymentStatus
  ): Promise<IPaymentEntity | null> {
    return await PaymentModel.findOneAndUpdate(
      { paymentIntentId },
      { $set: { status } },
      { new: true }
    );
  }

  async findByPaymentIntentId(
    paymentIntentId: string
  ): Promise<IPaymentEntity | null> {
    return await PaymentModel.findOne({ paymentIntentId });
  }

  async findByUserId(
    userId: any,
    skip: number,
    limit: number
  ): Promise<IPaymentEntity[] | []> {
    return await PaymentModel.find({ userId }).skip(skip).limit(limit);
  }

  async findByBookingId(bookingId: any): Promise<IPaymentEntity | null> {
    return await PaymentModel.findOne({ bookingId });
  }
}
