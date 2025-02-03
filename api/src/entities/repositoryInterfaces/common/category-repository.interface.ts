import { ICategoryModel } from "../../../frameworks/database/models/category.model";

export interface ICategoryRepository {
  find(): Promise<ICategoryModel[] | []>;
}
