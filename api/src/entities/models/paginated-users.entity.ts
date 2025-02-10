import { IClientEntity } from "./client.entity";
import { IVendorEntity } from "./vendor.entity";

export interface PaginatedUsers {
  user: IClientEntity[] | IVendorEntity[] | [];
  total: number;
}
