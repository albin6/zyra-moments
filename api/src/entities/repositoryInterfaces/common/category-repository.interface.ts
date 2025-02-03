import { ICategoryEntity } from "../../models/category.entity";

export interface ICategoryRepository {
  find(): Promise<ICategoryEntity[] | []>;
  save(title: string, categoryId: string): Promise<void>;
  findByTitle(title: string): Promise<ICategoryEntity | null>;
}
