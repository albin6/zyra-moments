import { IClientEntity } from "../../models/client.entity";

export interface IGetClientDetailsUseCase {
  execute(id: any): Promise<IClientEntity | null>;
}
