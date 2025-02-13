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

    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const limit = validPageSize;

    if (userType === "client") {
      const { user, total } = await this.clientRepository.find(
        filter,
        skip,
        limit
      );

      const response: PaginatedUsers = {
        user,
        total: Math.ceil(total / validPageSize),
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
        total: Math.ceil(total / validPageSize),
      };

      return response;
    }
    throw new CustomError(
      "Invalid user type. Expected 'client' or 'vendor'.",
      HTTP_STATUS.BAD_REQUEST
    );
  }
}
