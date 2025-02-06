import { inject, injectable } from "tsyringe";
import { IGetAllCategoryJoinRequestUseCase } from "../../entities/useCaseInterfaces/admin/get-all-category-join-request-usecase.interface";
import { ICategoryRequestRepository } from "../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { ICategoryRequestEntity } from "../../entities/models/category-request.entity";

@injectable()
export class GetAllCategoryJoinRequestUseCase
  implements IGetAllCategoryJoinRequestUseCase
{
  constructor(
    @inject("ICategoryRequestRepository")
    private categoryRequestRepository: ICategoryRequestRepository
  ) {}
  async execute(): Promise<ICategoryRequestEntity[] | []> {
    return await this.categoryRequestRepository.find();
  }
}
