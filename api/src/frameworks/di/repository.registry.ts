import { container } from "tsyringe";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { AdminRepository } from "../../interfaceAdapters/repositories/admin/admin.respository";
import { IClientRespository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { ClientRepository } from "../../interfaceAdapters/repositories/client/client.repository";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorRepository } from "../../interfaceAdapters/repositories/vendor/vendor.repository";

export class RepositoryRegistry {
  static registerRepositories(): void {
    container.register<IAdminRepository>("IAdminRepository", {
      useClass: AdminRepository,
    });

    container.register<IClientRespository>("IClientRespository", {
      useClass: ClientRepository,
    });

    container.register<IVendorRepository>("IVendorRepository", {
      useClass: VendorRepository,
    });
  }
}
