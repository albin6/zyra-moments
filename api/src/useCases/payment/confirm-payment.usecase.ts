import { inject, injectable } from "tsyringe";
import { IPaymentService } from "../../entities/services/payement-service.interface";
import { IConfirmPaymentUseCase } from "../../entities/useCaseInterfaces/payment/confirm-payment-usecase.interface";
import { IPaymentRepository } from "../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class ConfirmPaymentUseCase implements IConfirmPaymentUseCase {
  constructor(
    @inject("IPaymentService") private paymentService: IPaymentService,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository
  ) {}

  async execute(paymentIntentId: string): Promise<boolean> {
    try {
      const isConfirmed = await this.paymentService.confirmPayment(
        paymentIntentId
      );
      if (isConfirmed) {
        await this.paymentRepository.findByPaymentIntentIdAndUpdateStatus(
          paymentIntentId,
          "succeeded"
        );
      }
      return isConfirmed;
    } catch (error) {
      console.error("ConfirmPaymentUseCase Error:", error);
      throw new CustomError(
        "Failed to confirm payment",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}
