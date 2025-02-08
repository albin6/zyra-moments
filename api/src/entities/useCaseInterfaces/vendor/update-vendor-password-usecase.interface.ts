export interface IUpdateVendorPasswordUseCase {
  execute(id: any, current: string, newPassword: string): Promise<void>;
}
