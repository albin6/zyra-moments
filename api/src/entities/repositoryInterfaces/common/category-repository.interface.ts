import { ICategoryEntity } from "../../models/category.entity";
import { PaginatedCategories } from "../../models/paginated-category.entity";

export interface ICategoryRepository {
  find(): Promise<ICategoryEntity[] | []>;

  save(title: string, categoryId: string): Promise<ICategoryEntity>;

  findByTitle(title: string): Promise<ICategoryEntity | null>;

  findPaginatedCategory(
    filter: any,
    skip: number,
    limit: number
  ): Promise<PaginatedCategories>;
}
