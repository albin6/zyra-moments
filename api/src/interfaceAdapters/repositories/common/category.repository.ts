import { injectable } from "tsyringe";
import { ICategoryRepository } from "../../../entities/repositoryInterfaces/common/category-repository.interface";
import { CategoryModel } from "../../../frameworks/database/models/category.model";
import { ICategoryEntity } from "../../../entities/models/category.entity";
import { PaginatedCategories } from "../../../entities/models/paginated-category.entity";

@injectable()
export class CategoryRespository implements ICategoryRepository {
  async find(): Promise<ICategoryEntity[] | []> {
    return await CategoryModel.find({ status: true });
  }

  async save(title: string, categoryId: string): Promise<ICategoryEntity> {
    return await CategoryModel.create({ title, categoryId });
  }

  async findByTitle(title: string): Promise<ICategoryEntity | null> {
    return await CategoryModel.findOne({
      title: { $regex: new RegExp(`^${title.trim()}$`, "i") },
    });
  }

  async findById(id: any): Promise<ICategoryEntity | null> {
    return await CategoryModel.findById(id);
  }

  async findPaginatedCategory(
    filter: any,
    skip: number,
    limit: number
  ): Promise<PaginatedCategories> {
    const [categories, total, all] = await Promise.all([
      CategoryModel.find(filter)
        .select("status title _id")
        .skip(skip)
        .limit(limit),
      CategoryModel.countDocuments(filter),
      CategoryModel.countDocuments(),
    ]);

    return {
      categories,
      total,
      all,
    };
  }

  async updateCategoryStatus(id: any): Promise<void> {
    await CategoryModel.findByIdAndUpdate(id, [
      { $set: { status: { $not: "$status" } } },
    ]);
  }
}
