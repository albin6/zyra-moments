import { IServiceEntity } from "../../../models/service.entity";

export interface IGetServiceDetailsByIdUseCase {
  execute(id: any): Promise<IServiceEntity | null>;
}
