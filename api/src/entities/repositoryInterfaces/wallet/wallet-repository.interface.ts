export interface IWalletRepository {
  create(userId: any): Promise<void>;
}
