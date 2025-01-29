import { inject, injectable } from "tsyringe";
import { IClientRespository } from "../../entities/repositoryInterfaces/client/client.respository.interface";
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register.usecase.inteface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor.repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin.repository.interface";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject("IClientRespository") private clientRepository: IClientRespository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("IAdminRepository") private adminRepository: IAdminRepository
  ) {}

  async execute(user: UserDTO): Promise<void> {
    switch (user.role) {
      case "admin":
        await this.adminRepository.save(user);
        break;
      case "client":
        await this.clientRepository.save(user);
        break;
      case "vendor":
        await this.vendorRepository.save(user);
        break;
      default:
        break;
    }
  }
}
