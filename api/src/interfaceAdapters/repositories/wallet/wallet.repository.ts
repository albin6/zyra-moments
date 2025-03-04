import { injectable } from "tsyringe";
import { PopulatedWallet } from "../../../entities/models/wallet.entity";
import { IWalletRepository } from "../../../entities/repositoryInterfaces/wallet/wallet-repository.interface";
import { WalletModel } from "../../../frameworks/database/models/wallet.model";

@injectable()
export class WalletRepository implements IWalletRepository {
  async create(userId: any): Promise<void> {
    await WalletModel.create({ userId });
  }

  async findPopulatedWalletByUserId(userId: any): Promise<PopulatedWallet> {
    return (await WalletModel.findOne({ userId })
      .populate({
        path: "userId",
        select: "firstName lastName email",
      })
      .populate("paymentId")) as unknown as PopulatedWallet;
  }
}
