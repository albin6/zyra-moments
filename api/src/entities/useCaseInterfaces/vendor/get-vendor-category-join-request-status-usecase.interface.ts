export interface IGetVendorCategoryJoinRequestStatusUseCase {
  execute(vendorId: any): Promise<boolean>;
}
