import { AdminDTO } from "../../../shared/dtos/user.dto";
import { IAdminEntity } from "../../models/admin.entity";

export interface IAdminRepository {
  save(data: AdminDTO): Promise<IAdminEntity | null>;
}
