import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/common/category-repository.interface";
import { IGetAllCategoriesUseCase } from "../../entities/useCaseInterfaces/common/get-all-categories-usecase.inteface";
import { ICategoryModel } from "../../frameworks/database/models/category.model";

@injectable()
export class GetAllCategoriesUseCase implements IGetAllCategoriesUseCase {
  constructor(
    @inject("ICategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<ICategoryModel[] | null> {
    return this.categoryRepository.find();
  }
}
