import { ICategoryEntity } from "../../models/category.entity";

export interface ICategoryRepository {
  find(): Promise<ICategoryEntity[] | []>;

  save(title: string, categoryId: string): Promise<ICategoryEntity>;

  findByTitle(title: string): Promise<ICategoryEntity | null>;

  findPaginatedCategory(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{
    categories: Pick<ICategoryEntity, "_id" | "status" | "title">[] | [];
    total: number;
  }>;
}
