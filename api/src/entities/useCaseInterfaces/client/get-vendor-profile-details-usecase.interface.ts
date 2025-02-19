import { VendorProfileForClient } from "../../models/vendor-profile-for-client.entity";

export interface IGetVendorProfileDetailsUseCase {
  execute(
    id: any,
    paginatedParams: {
      servicePage: number;
      workSamplePage: number;
      limit: number;
    }
  ): Promise<VendorProfileForClient>;
}
