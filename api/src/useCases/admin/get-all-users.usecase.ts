import { inject, injectable } from "tsyringe";
import { IClientEntity } from "../../entities/models/client.entity";
import { IVendorEntity } from "../../entities/models/vendor.entity";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetAllUsersUseCase } from "../../entities/useCaseInterfaces/admin/get-all-users-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}

  async execute(
    userType: string
  ): Promise<IClientEntity[] | IVendorEntity[] | []> {
    if (userType === "client") {
      return await this.clientRepository.find();
    }
    if (userType === "vendor") {
      return await this.vendorRepository.find();
    }
    throw new CustomError(
      "Invalid user type. Expected 'client' or 'vendor'.",
      HTTP_STATUS.BAD_REQUEST
    );
  }
}
