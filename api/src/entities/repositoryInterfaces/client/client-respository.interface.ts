import { ClientDTO } from "../../../shared/dtos/user.dto";
import { IClientEntity } from "../../models/client.entity";

export interface IClientRepository {
  save(data: ClientDTO): Promise<IClientEntity>;
  findByEmail(email: string): Promise<IClientEntity | null>;
}
