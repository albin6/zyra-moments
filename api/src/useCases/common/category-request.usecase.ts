import { ICategoryRepository } from "../../entities/repositoryInterfaces/common/category-repository.interface";
import { ICategoryRequestRepository } from "../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { ICategoryRequestUseCase } from "../../entities/useCaseInterfaces/common/category-request-usecase.interface";

export class CategoryRequestUseCase implements ICategoryRequestUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private categoryRequestRepository: ICategoryRequestRepository
  ) {}

  async exectute(): Promise<void> {}
}
