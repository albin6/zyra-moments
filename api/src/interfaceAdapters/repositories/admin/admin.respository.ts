import { injectable } from "tsyringe";
import { IAdminEntity } from "../../../entities/models/admin.entity";
import { IAdminRepository } from "../../../entities/repositoryInterfaces/admin/admin.repository.interface";
import { AdminModel } from "../../../frameworks/database/models/admin.model";
import { AdminDTO } from "../../../shared/dtos/user.dto";

@injectable()
export class AdminRepository implements IAdminRepository {
  async save(data: AdminDTO): Promise<IAdminEntity | null> {
    return await AdminModel.create(data);
  }
}
