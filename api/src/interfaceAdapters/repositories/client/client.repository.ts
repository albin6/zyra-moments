import { injectable } from "tsyringe";
import { IClientEntity } from "../../../entities/models/client.entity";
import { IClientRepository } from "../../../entities/repositoryInterfaces/client/client-respository.interface";
import { ClientModel } from "../../../frameworks/database/models/client.model";

@injectable()
export class ClientRepository implements IClientRepository {
  async save(data: Partial<IClientEntity>): Promise<IClientEntity> {
    return await ClientModel.create(data);
  }

  async findByEmail(email: string): Promise<IClientEntity | null> {
    return await ClientModel.findOne({ email });
  }

  async find(): Promise<IClientEntity[] | []> {
    return await ClientModel.find();
  }

  async findById(id: any): Promise<IClientEntity | null> {
    return await ClientModel.findById(id);
  }

  async findByIdAndUpdatePassword(id: any, password: string): Promise<void> {
    await ClientModel.findByIdAndUpdate(id, { password });
  }
}
