import { injectable } from "tsyringe";
import { IAdminEntity } from "../../../entities/models/admin.entity";
import { IAdminRepository } from "../../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { AdminModel } from "../../../frameworks/database/models/admin.model";

@injectable()
export class AdminRepository implements IAdminRepository {
  async save(data: Partial<IAdminEntity>): Promise<IAdminEntity> {
    return await AdminModel.create(data);
  }

  async findByEmail(email: string): Promise<IAdminEntity | null> {
    return await AdminModel.findOne({ email });
  }
}
