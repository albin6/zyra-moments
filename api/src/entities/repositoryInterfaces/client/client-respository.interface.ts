import { ClientDTO } from "../../../shared/dtos/user.dto";
import { IClientEntity } from "../../models/client.entity";

export interface IClientRespository {
  save(data: ClientDTO): Promise<IClientEntity | null>;
}
