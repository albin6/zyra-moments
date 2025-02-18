import { IServiceEntity } from "../../../models/service.entity";

export interface IUpdateServiceByIdUseCase {
  execute(id: any, data: IServiceEntity): Promise<void>;
}
