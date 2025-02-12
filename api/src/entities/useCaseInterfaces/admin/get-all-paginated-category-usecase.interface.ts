import { PaginatedCategories } from "../../models/paginated-category.entity";

export interface IGetAllPaginatedCategoryUseCase {
  execute(
    pageNumber: number,
    pageSize: number,
    searchTerm: string
  ): Promise<PaginatedCategories>;
}
