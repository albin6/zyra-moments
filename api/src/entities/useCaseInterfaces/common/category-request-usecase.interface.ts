export interface ICategoryRequestUseCase {
  exectute(title: string, vendorId: string): Promise<void>;
}
