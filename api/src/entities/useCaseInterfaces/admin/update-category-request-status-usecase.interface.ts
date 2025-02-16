export interface IUpdateCategoryRequestStatusUseCase {
  execute(id: any, status: string): Promise<void>;
}
