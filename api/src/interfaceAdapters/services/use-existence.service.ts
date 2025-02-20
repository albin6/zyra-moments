import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { IUserExistenceService } from "../../entities/services/user-existence-service.interface";

@injectable()
export class UserExistenceService implements IUserExistenceService {
  constructor(
    @inject("IClientRepository") private clientRepo: IClientRepository,
    @inject("IVendorRepository") private vendorRepo: IVendorRepository,
    @inject("IAdminRepository") private adminRepo: IAdminRepository
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const [client, vendor, admin] = await Promise.all([
      this.clientRepo.findByEmail(email),
      this.vendorRepo.findByEmail(email),
      this.adminRepo.findByEmail(email),
    ]);

    return Boolean(client || vendor || admin);
  }
}
