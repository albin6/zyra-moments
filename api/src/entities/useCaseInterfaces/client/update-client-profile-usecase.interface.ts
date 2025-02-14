import { IClientEntity } from "../../models/client.entity";

export interface IUpdateClientProfileUseCase {
  execute(clientId: string, data: Partial<IClientEntity>): Promise<void>;
}
