import { inject, injectable } from "tsyringe";
import { IPaymentService } from "../../entities/services/payement-service.interface";
import { ICreatePaymentIntentUseCase } from "../../entities/useCaseInterfaces/payment/create-payment-intent-usecase.interface";
import { IPaymentRepository } from "../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { Purpose } from "../../entities/models/payment.entity";
import { CustomError } from "../../entities/utils/custom-error";
import { HTTP_STATUS } from "../../shared/constants";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { any } from "zod";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet/wallet-repository.interface";

@injectable()
export class CreatePaymentIntentUseCase implements ICreatePaymentIntentUseCase {
  constructor(
    @inject("IPaymentService") private paymentService: IPaymentService,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository,
    @inject("IClientRepository") private clientRepository: IClientRepository,
    @inject("IAdminRepository") private adminRepository: IAdminRepository,
    @inject("IWalletRepository") private walletRepository: IWalletRepository
  ) {}
  async execute(
    amount: number,
    currency: string,
    purpose: Purpose,
    userId: string,
    receiverId: any,
    createrType: string,
    receiverType: string,
    bookingId?: string
  ): Promise<{
    paymentIntent: string;
    clientSecret: string;
  }> {
    try {
      const { paymentIntent, clientSecret } =
        await this.paymentService.createPaymentIntent(amount, currency);

      const payment = await this.paymentRepository.save({
        userId,
        receiverId,
        bookingId,
        createrType: createrType as any,
        receiverType: receiverType as any,
        amount: amount / 100,
        currency,
        purpose,
        status: "pending",
        paymentIntentId: paymentIntent,
        transactionId: `TXN_${Date.now()}`,
        createdAt: new Date(),
      });

      const admin = await this.adminRepository.findByEmail(
        "albinpariyarath@gmail.com"
      );

      await this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
        admin?._id,
        amount / 100,
        payment._id
      );

      if (!bookingId && purpose === "role-upgrade") {
        await this.clientRepository.findByClientIdAndUpdateMCStatus(userId);
      }

      console.log(
        "in create payment intent paymentintent=>",
        paymentIntent,
        clientSecret
      );

      return { paymentIntent: paymentIntent, clientSecret: clientSecret };
    } catch (error) {
      console.error("CreatePaymentIntentUseCase Error:", error);
      throw new CustomError(
        "Failed to create payment intent",
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}
