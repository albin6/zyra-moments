import { injectable } from "tsyringe";
import { IClientEntity } from "../../../entities/models/client.entity";
import { IClientRepository } from "../../../entities/repositoryInterfaces/client/client-respository.interface";
import {
  ClientModel,
  IClientModel,
} from "../../../frameworks/database/models/client.model";

@injectable()
export class ClientRepository implements IClientRepository {
  async save(data: Partial<IClientEntity>): Promise<IClientEntity> {
    return await ClientModel.create(data);
  }

  async findByEmail(email: string): Promise<IClientEntity | null> {
    return await ClientModel.findOne({ email });
  }

  async find(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ user: IClientEntity[] | []; total: number }> {
    const [user, total] = await Promise.all([
      ClientModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ClientModel.countDocuments(filter),
    ]);

    return {
      user,
      total,
    };
  }

  async findById(id: any): Promise<IClientEntity | null> {
    return await ClientModel.findById(id);
  }

  async findByIdAndUpdatePassword(id: any, password: string): Promise<void> {
    await ClientModel.findByIdAndUpdate(id, { password });
  }

  async findByIdAndUpdateStatus(id: any, status: string): Promise<void> {
    await ClientModel.findByIdAndUpdate(id, {
      $set: {
        status: status,
      },
    });
  }

  async updateClientProfileById(
    id: string,
    data: Partial<IClientEntity>
  ): Promise<void> {
    await ClientModel.findByIdAndUpdate(id, { $set: data });
  }

  async findByClientIdAndUpdateMCStatus(id: any): Promise<void> {
    const client = await ClientModel.findById(id);

    if (client) {
      client.masterOfCeremonies = !client.masterOfCeremonies;
      await client.save();
    }
  }

  // ----------------------------------------------------------------------
  async findByIdForChat(id: any): Promise<IClientEntity | null> {
    return ClientModel.findById(id).exec();
  }

  async findByIdAndUpdateOnlineStatus(
    id: any,
    onlineStatus: "online" | "offline"
  ): Promise<void> {
    await ClientModel.updateOne(
      { _id: id },
      { onlineStatus, lastStatusUpdated: new Date() }
    );
  }

  async findByIds(clientIds: string[]): Promise<IClientModel[]> {
    return await ClientModel.find({
      _id: { $in: clientIds },
    }).exec();
  }
}
