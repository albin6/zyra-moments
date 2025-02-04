export interface ICategoryRequestUseCase {
  exectute(title: string, vendorId: any): Promise<void>;
}
