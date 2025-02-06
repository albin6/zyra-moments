import { ICategoryRequestEntity } from "../../models/category-request.entity";

export interface IGetAllCategoryJoinRequestUseCase {
  execute(): Promise<ICategoryRequestEntity[] | []>;
}
