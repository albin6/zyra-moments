import { IAdminEntity } from "../../models/admin.entity";

export interface IAdminRepository {
  save(data: Partial<IAdminEntity>): Promise<IAdminEntity>;
  findByEmail(email: string): Promise<IAdminEntity | null>;
}
