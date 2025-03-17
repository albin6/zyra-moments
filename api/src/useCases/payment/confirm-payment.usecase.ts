import { inject, injectable } from "tsyringe";
import { IPaymentService } from "../../entities/services/payement-service.interface";
import { IConfirmPaymentUseCase } from "../../entities/useCaseInterfaces/payment/confirm-payment-usecase.interface";
import { IPaymentRepository } from "../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class ConfirmPaymentUseCase implements IConfirmPaymentUseCase {
  constructor(
    @inject("IPaymentService") private paymentService: IPaymentService,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository
  ) {}

  async execute(paymentIntentId: string): Promise<boolean> {
    const isConfirmed = await this.paymentService.confirmPayment(
      paymentIntentId
    );
    if (!isConfirmed) {
      throw new CustomError(
        "Failed to confirm payment",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
      // await this.paymentRepository.findByPaymentIntentIdAndUpdateStatus(
      //   paymentIntentId,
      //   "succeeded"
      // );
    }
    return isConfirmed;
  }
}
