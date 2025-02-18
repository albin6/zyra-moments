import { inject, injectable } from "tsyringe";
import { PaginatedVendorsUnderCategory } from "../../entities/models/paginated-vendors-under-category.entity";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetVendorsUnderCategoryUseCase } from "../../entities/useCaseInterfaces/client/get-vendors-under-category-usecase.interface";

@injectable()
export class GetVendorsUnderCategoryUseCase
  implements IGetVendorsUnderCategoryUseCase
{
  constructor(
    @inject("IVendorRepository")
    private readonly vendorRepository: IVendorRepository
  ) {}

  async execute(
    pageNumber: number,
    pageSize: number,
    searchTerm: string,
    sortBy: string,
    categoryId: string
  ): Promise<PaginatedVendorsUnderCategory> {
    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const limit = validPageSize;

    const filter: any = {
      category: categoryId,
      status: "active",
    };

    if (searchTerm) {
      filter.$or = [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { place: { $regex: searchTerm, $options: "i" } },
      ];
    }

    let sort: any = {};
    switch (sortBy) {
      case "name_asc":
        sort = { firstName: 1, lastName: 1 };
        break;
      case "name_desc":
        sort = { firstName: -1, lastName: -1 };
        break;
      case "rating_high_to_low":
        sort = { averageRating: -1 };
        break;
      case "rating_low_to_high":
        sort = { averageRating: 1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    const { vendors, total } = await this.vendorRepository.findByCategoryId(
      filter,
      sort,
      skip,
      limit
    );

    return {
      vendors,
      total: Math.ceil(total / pageSize),
    };
  }
}
