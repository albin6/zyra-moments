import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/common/category-repository.interface";
import { IUpdateCategoryStatusUseCase } from "../../entities/useCaseInterfaces/admin/update-category-status-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateCategoryStatusUseCase
  implements IUpdateCategoryStatusUseCase
{
  constructor(
    @inject("ICategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}
  async execute(id: any): Promise<void> {
    const isCategoryExistsWithTheId = await this.categoryRepository.findById(
      id
    );

    if (!isCategoryExistsWithTheId) {
      throw new CustomError(
        ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    await this.categoryRepository.updateCategoryStatus(id);
  }
}
