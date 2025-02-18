import { PaginatedVendorsUnderCategory } from "../../models/paginated-vendors-under-category.entity";

export interface IGetVendorsUnderCategoryUseCase {
  execute(
    pageNumber: number,
    pageSize: number,
    searchTerm: string,
    sortBy: string,
    categoryId: string
  ): Promise<PaginatedVendorsUnderCategory>;
}
