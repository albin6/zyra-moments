import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/common/category-repository.interface";
import { ICategoryRequestRepository } from "../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { ICategoryRequestUseCase } from "../../entities/useCaseInterfaces/common/category-request-usecase.interface";
import { generateRandomUUID } from "../../frameworks/security/randomid.bcrypt";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class CategoryRequestUseCase implements ICategoryRequestUseCase {
  constructor(
    @inject("ICategoryRepository")
    private categoryRepository: ICategoryRepository,
    @inject("ICategoryRequestRepository")
    private categoryRequestRepository: ICategoryRequestRepository
  ) {}

  async exectute(title: string, vendorId: any): Promise<void> {
    const categoryId = generateRandomUUID();

    let category = await this.categoryRepository.findByTitle(title);

    if (!category) {
      category = await this.categoryRepository.save(title, categoryId);
    }

    if (category._id) {
      console.log("hereeeeeeeeeeeeeeeee");
      const isRequestCategory =
        await this.categoryRequestRepository.findByVendorAndCategory(
          vendorId,
          category._id
        );

      if (isRequestCategory) {
        throw new CustomError(
          "A similar request is already in progress.",
          HTTP_STATUS.CONFLICT
        );
      }

      await this.categoryRequestRepository.save(vendorId, category._id);
    }
  }
}
