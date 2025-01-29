import { container } from "tsyringe";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorRepository } from "../../../interfaceAdapters/repositories/vendor/vendor.repository";

export class VendorRepositoryRegistry {
  static registerRepositories(): void {
    container.register<IVendorRepository>("IVendorRepository", {
      useClass: VendorRepository,
    });
  }
}
