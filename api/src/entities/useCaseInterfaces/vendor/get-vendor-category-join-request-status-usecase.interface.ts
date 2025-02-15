export interface IGetVendorCategoryJoinRequestStatusUseCase {
  execute(vendorId: any): Promise<string | undefined>;
}
