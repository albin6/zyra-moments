import { IVendorEntity } from "./vendor.entity";

export interface PaginatedVendorsUnderCategory {
  vendors: IVendorEntity[] | [];
  total: number;
}
