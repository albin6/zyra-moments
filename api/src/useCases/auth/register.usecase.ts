import { inject, injectable } from "tsyringe";
import { IClientRespository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.inteface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { generateRandomUUID } from "../../frameworks/security/randomid.bcrypt";

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
        const isClientExistsWithTheEmail =
          await this.clientRepository.findByEmail(user.email);
        if (isClientExistsWithTheEmail) {
          throw new Error("Email Already Exists");
        }

        const clientId = generateRandomUUID();
        await this.clientRepository.save({ ...user, clientId });
        break;
      case "vendor":
        const isVendorExistsWithTheEmail =
          await this.vendorRepository.findByEmail(user.email);
        if (isVendorExistsWithTheEmail) {
          throw new Error("Email Already Exists");
        }

        const vendorId = generateRandomUUID();
        await this.vendorRepository.save({ ...user, vendorId });
        break;
      default:
        throw new Error("Invalid user role");
    }
  }
}
