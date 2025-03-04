import { PopulatedWallet } from "../../models/wallet.entity";

export interface IWalletRepository {
  create(userId: any, userType: string, role: string): Promise<void>;

  findPopulatedWalletByUserId(userId: any): Promise<PopulatedWallet>;

  findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
    userId: any,
    balance: number,
    paymentId: any
  ): Promise<void>;
}
