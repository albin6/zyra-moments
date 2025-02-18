import { IServiceEntity } from "../../../models/service.entity";

export interface ICreateServiceUseCase {
  execute(data: IServiceEntity): Promise<void>;
}
