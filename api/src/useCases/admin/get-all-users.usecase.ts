import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetAllUsersUseCase } from "../../entities/useCaseInterfaces/admin/get-all-users-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";
import { PaginatedUsers } from "../../entities/models/paginated-users.entity";

@injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}

  async execute(
    userType: string,
    pageNumber: number,
    pageSize: number,
    searchTerm: string
  ): Promise<PaginatedUsers> {
    let filter: any = {};
    if (userType) {
      filter.role = userType;
    }

    if (searchTerm) {
      filter.$or = [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ];
    }
    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    if (userType === "client") {
      const { user, total } = await this.clientRepository.find(
        filter,
        skip,
        limit
      );

      const response: PaginatedUsers = {
        user,
        total,
      };

      return response;
    }
    if (userType === "vendor") {
      const { user, total } = await this.vendorRepository.find(
        filter,
        skip,
        limit
      );

      const response: PaginatedUsers = {
        user,
        total,
      };

      return response;
    }
    throw new CustomError(
      "Invalid user type. Expected 'client' or 'vendor'.",
      HTTP_STATUS.BAD_REQUEST
    );
  }
}
