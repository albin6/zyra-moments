import { container } from "tsyringe";
import { IAdminRepository } from "../../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { AdminRepository } from "../../../interfaceAdapters/repositories/admin/admin.respository";

export class AdminRepositoryRegistry {
  static registerRepositories(): void {
    container.register<IAdminRepository>("IAdminRepository", AdminRepository);
  }
}
