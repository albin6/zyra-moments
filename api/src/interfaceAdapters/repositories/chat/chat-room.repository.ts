import { injectable } from "tsyringe";
import { IChatRoomEntity } from "../../../entities/models/chat-room.entity";
import { IChatRoomRepository } from "../../../entities/repositoryInterfaces/chat/chat-room-repository.interface";
import { ChatRoomModel } from "../../../frameworks/database/models/chat-room.model";

@injectable()
export class ChatRoomRepository implements IChatRoomRepository {
  async findById(id: any): Promise<IChatRoomEntity | null> {
    return ChatRoomModel.findById(id).exec();
  }

  async findByClientId(clientId: any): Promise<IChatRoomEntity[]> {
    return ChatRoomModel.find({ clientId }).exec();
  }

  async findByVendorId(vendorId: any): Promise<IChatRoomEntity[]> {
    return ChatRoomModel.find({ vendorId }).exec();
  }

  async findOrCreate(
    clientId: any,
    vendorId: any,
    lastMessage: string,
    lastMessageAt: any
  ): Promise<IChatRoomEntity> {
    let chatRoom = await ChatRoomModel.findOne({
      clientId,
      vendorId,
    }).exec();
    if (!chatRoom) {
      chatRoom = await ChatRoomModel.create({
        clientId,
        vendorId,
        lastMessage: null,
        lastMessageAt,
      });
    }
    return chatRoom;
  }
}
