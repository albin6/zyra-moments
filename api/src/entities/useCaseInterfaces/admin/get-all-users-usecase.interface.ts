import { IClientEntity } from "../../models/client.entity";
import { IVendorEntity } from "../../models/vendor.entity";

export interface IGetAllUsersUseCase {
  execute(userType: string): Promise<IClientEntity[] | IVendorEntity[] | []>;
}
