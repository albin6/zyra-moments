import { inject, injectable } from "tsyringe";
import { IPaymentService } from "../../entities/services/payement-service.interface";
import { ICreatePaymentIntentUseCase } from "../../entities/useCaseInterfaces/payment/create-payment-intent-usecase.interface";
import { IPaymentRepository } from "../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { Purpose } from "../../entities/models/payment.entity";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class CreatePaymentIntentUseCase implements ICreatePaymentIntentUseCase {
  constructor(
    @inject("IPaymentService") private paymentService: IPaymentService,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository
  ) {}
  async execute(
    amount: number,
    currency: string,
    purpose: Purpose,
    userId: string,
    bookingId: string
  ): Promise<string> {
    try {
      const paymentIntent = await this.paymentService.createPaymentIntent(
        amount,
        currency
      );

      await this.paymentRepository.save({
        userId,
        bookingId,
        amount,
        currency,
        purpose,
        status: "pending",
        paymentIntentId: paymentIntent,
        transactionId: `TXN_${Date.now()}`,
        createdAt: new Date(),
      });

      return paymentIntent;
    } catch (error) {
      console.error("CreatePaymentIntentUseCase Error:", error);
      throw new CustomError(
        "Failed to create payment intent",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}
