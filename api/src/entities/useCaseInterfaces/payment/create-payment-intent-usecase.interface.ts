import { Purpose } from "../../models/payment.entity";

export interface ICreatePaymentIntentUseCase {
  execute(
    amount: number,
    currency: string,
    purpose: Purpose,
    userId: string
  ): Promise<string>;
}
