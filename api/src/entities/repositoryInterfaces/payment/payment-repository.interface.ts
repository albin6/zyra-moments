import { IPaymentEntity, PaymentStatus } from "../../models/payment.entity";

export interface IPaymentRepository {
  save(payment: Partial<IPaymentEntity>): Promise<IPaymentEntity>;

  findByPaymentIntentIdAndUpdateStatus(
    paymentIntentId: string,
    status: PaymentStatus
  ): Promise<IPaymentEntity | null>;

  findByPaymentIntentId(
    paymentIntentId: string
  ): Promise<IPaymentEntity | null>;

  findByUserId(
    userId: any,
    skip: number,
    limit: number
  ): Promise<IPaymentEntity[]>;
}
