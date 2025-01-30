import { injectable } from "tsyringe";
import { IClientEntity } from "../../../entities/models/client.entity";
import { IClientRespository } from "../../../entities/repositoryInterfaces/client/client-respository.interface";
import { ClientModel } from "../../../frameworks/database/models/client.model";
import { ClientDTO } from "../../../shared/dtos/user.dto";

@injectable()
export class ClientRepository implements IClientRespository {
  async save(data: ClientDTO): Promise<IClientEntity> {
    return await ClientModel.create(data);
  }

  async findByEmail(email: string): Promise<IClientEntity | null> {
    return await ClientModel.findOne({ email });
  }
}
