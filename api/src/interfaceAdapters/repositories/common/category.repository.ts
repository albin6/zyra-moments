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

  async findPaginatedCategory(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{
    categories: Pick<ICategoryEntity, "_id" | "title" | "status">[] | [];
    total: number;
  }> {
    const [categories, total] = await Promise.all([
      CategoryModel.find(filter)
        .select("status title _id")
        .skip(skip)
        .limit(limit),
      CategoryModel.countDocuments(filter),
    ]);

    return {
      categories,
      total,
    };
  }
}
