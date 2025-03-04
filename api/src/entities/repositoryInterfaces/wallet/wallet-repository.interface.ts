import { PopulatedWallet } from "../../models/wallet.entity";

export interface IWalletRepository {
  create(userId: any): Promise<void>;

  findPopulatedWalletByUserId(userId: any): Promise<PopulatedWallet>;
}
