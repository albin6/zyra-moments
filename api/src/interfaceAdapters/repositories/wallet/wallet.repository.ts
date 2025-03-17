import { injectable } from "tsyringe";
import { PopulatedWallet } from "../../../entities/models/wallet.entity";
import { IWalletRepository } from "../../../entities/repositoryInterfaces/wallet/wallet-repository.interface";
import { WalletModel } from "../../../frameworks/database/models/wallet.model";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class WalletRepository implements IWalletRepository {
  async create(userId: any, userType: string, role: string): Promise<void> {
    await WalletModel.create({ userId, userType, role });
  }

  async findPopulatedWalletByUserId(userId: any): Promise<PopulatedWallet> {
    return (await WalletModel.findOne({ userId })
      .populate({
        path: "userId",
        select: "firstName lastName email",
      })
      .populate("paymentId")) as unknown as PopulatedWallet;
  }

  async findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
    userId: string,
    balance: number,
    paymentId: any
  ): Promise<void> {
    const wallet = await WalletModel.findOne({ userId });

    if (!wallet) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }

    const newBalance = wallet.balance + balance;
    if (newBalance < 0) {
      throw new CustomError("Insufficient funds", HTTP_STATUS.BAD_REQUEST);
    }

    wallet.balance = newBalance;
    wallet.paymentId.push(paymentId);
    await wallet.save();
  }
}
