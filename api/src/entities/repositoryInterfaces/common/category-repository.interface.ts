import { ICategoryEntity } from "../../models/category.entity";

export interface ICategoryRepository {
  find(): Promise<ICategoryEntity[] | []>;
  save(title: string, categoryId: string): Promise<ICategoryEntity>;
  findByTitle(title: string): Promise<ICategoryEntity | null>;
}
