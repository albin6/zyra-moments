import { ICategoryModel } from "../../../frameworks/database/models/category.model";

export interface IGetAllCategoriesUseCase {
  execute(): Promise<ICategoryModel[] | null>;
}
