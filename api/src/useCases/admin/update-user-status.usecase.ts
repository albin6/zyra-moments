import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IUpdateUserStatusUseCase } from "../../entities/useCaseInterfaces/admin/update-user-status-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateUserStatusUseCase implements IUpdateUserStatusUseCase {
  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}
  async execute(userType: string, userId: any): Promise<void> {
    if (userType === "client") {
      const user = await this.clientRepository.findById(userId);

      if (!user) {
        throw new CustomError(
          ERROR_MESSAGES.USER_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND
        );
      }

      const newStatus = user.status === "active" ? "inactive" : "active";

      await this.clientRepository.findByIdAndUpdateStatus(userId, newStatus);
    } else if (userType === "vendor") {
      const user = await this.clientRepository.findById(userId);

      if (!user) {
        throw new CustomError(
          ERROR_MESSAGES.USER_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND
        );
      }

      const newStatus = user.status === "active" ? "inactive" : "active";

      await this.vendorRepository.findByIdAndUpdateStatus(userId, newStatus);
    }
  }
}
