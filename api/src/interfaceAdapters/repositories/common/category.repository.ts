import { injectable } from "tsyringe";
import { ICategoryRepository } from "../../../entities/repositoryInterfaces/common/category-repository.interface";
import {
  CategoryModel,
  ICategoryModel,
} from "../../../frameworks/database/models/category.model";

@injectable()
export class CategoryRespository implements ICategoryRepository {
  async find(): Promise<ICategoryModel[] | []> {
    return await CategoryModel.find();
  }
}
