import { inject, injectable } from "tsyringe";
import { IFundReleaseRequestRepository } from "../../../entities/repositoryInterfaces/event/fund-release-request-repository.interface";
import { IUpdateFundReleaseRequestStatusUseCase } from "../../../entities/useCaseInterfaces/event/fund-release/update-fund-release-request-status-usecase.inteface";
import { IFundReleaseRequestEntity } from "../../../entities/models/fund-release-request.entity";
import { IWalletRepository } from "../../../entities/repositoryInterfaces/wallet/wallet-repository.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { IPaymentRepository } from "../../../entities/repositoryInterfaces/payment/payment-repository.interface";

@injectable()
export class UpdateFundReleaseRequestStatusUseCase
  implements IUpdateFundReleaseRequestStatusUseCase
{
  constructor(
    @inject("IFundReleaseRequestRepository")
    private fundReleaseRequestRepository: IFundReleaseRequestRepository,
    @inject("IWalletRepository") private walletRepository: IWalletRepository,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository
  ) {}

  async execute(
    requestId: string,
    status: IFundReleaseRequestEntity["status"]
  ): Promise<IFundReleaseRequestEntity> {
    const request = await this.fundReleaseRequestRepository.updateStatus(
      requestId,
      status
    );
    if (!request) {
      throw new CustomError(
        ERROR_MESSAGES.REQUEST_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const payment = await this.paymentRepository.save({
      userId: "67cef9adee1eeefc92f10237" as any,
      receiverId: request.organizerId,
      createrType: "Admin",
      receiverType: "Client",
      amount: request.totalAmount,
      currency: "usd",
      purpose: "ticket-purchase",
      status: "succeeded",
      paymentIntentId: "pi_3R4cTMK0oDaPVFn31pl8rHdf",
      transactionId: `TXN_${Date.now()}`,
      createdAt: new Date(),
    });

    await Promise.all([
      await this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
        request.organizerId,
        request.totalAmount,
        payment?._id,
        true
      ),
      this.walletRepository.findWalletByUserIdAndUpdateBalanceForCancel(
        "67cef9adee1eeefc92f10237" as string,
        request.totalAmount * -1,
        payment._id as any
      ),
    ]);

    return request;
  }
}
