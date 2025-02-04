import { injectable } from "tsyringe";
import { ICategoryRepository } from "../../../entities/repositoryInterfaces/common/category-repository.interface";
import { CategoryModel } from "../../../frameworks/database/models/category.model";
import { ICategoryEntity } from "../../../entities/models/category.entity";

@injectable()
export class CategoryRespository implements ICategoryRepository {
  async find(): Promise<ICategoryEntity[] | []> {
    return await CategoryModel.find();
  }

  async save(title: string, categoryId: string): Promise<ICategoryEntity> {
    return await CategoryModel.create({ title, categoryId });
  }

  async findByTitle(title: string): Promise<ICategoryEntity | null> {
    return await CategoryModel.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
    });
  }
}
