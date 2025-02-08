import { IClientEntity } from "../../models/client.entity";

export interface IClientRepository {
  save(data: Partial<IClientEntity>): Promise<IClientEntity>;
  findByEmail(email: string): Promise<IClientEntity | null>;
  find(): Promise<IClientEntity[] | []>;
  findById(id: any): Promise<IClientEntity | null>;
  findByIdAndUpdatePassword(id: any, password: string): Promise<void>;
}
