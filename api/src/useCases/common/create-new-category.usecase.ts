import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/common/category-repository.interface";
import { ICreateNewCategoryUseCase } from "../../entities/useCaseInterfaces/common/create-new-category-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";
import { generateRandomUUID } from "../../frameworks/security/randomid.bcrypt";

@injectable()
export class CreateNewCategoryUseCase implements ICreateNewCategoryUseCase {
  constructor(
    @inject("ICategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}
  async execute(title: string): Promise<void> {
    const isCategoryExists = await this.categoryRepository.findByTitle(title);

    if (isCategoryExists) {
      throw new CustomError("Category Exists", HTTP_STATUS.CONFLICT);
    }

    const categoryId = generateRandomUUID();
    await this.categoryRepository.save(title, categoryId);
  }
}
