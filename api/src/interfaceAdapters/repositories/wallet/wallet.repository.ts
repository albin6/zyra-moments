import { IWalletRepository } from "../../../entities/repositoryInterfaces/wallet/wallet-repository.interface";
import { WalletModel } from "../../../frameworks/database/models/wallet.model";

export class WalletRepository implements IWalletRepository {
  async create(userId: any): Promise<void> {
    await WalletModel.create({ userId });
  }
}
