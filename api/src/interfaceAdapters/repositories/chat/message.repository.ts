import { IMessageEntity } from "../../../entities/models/message.entity";
import { IMessageRepository } from "../../../entities/repositoryInterfaces/chat/message-repository.interface";
import { MessageModel } from "../../../frameworks/database/models/message.model";

export class MessageRepository implements IMessageRepository {
  async create(message: IMessageEntity): Promise<IMessageEntity> {
    return await MessageModel.create(message);
  }

  async findByChatRoomId(chatRoomId: any): Promise<IMessageEntity[]> {
    return MessageModel.find({ chatRoomId }).sort({ createdAt: 1 }).exec();
  }

  async markAsRead(messageId: any): Promise<void> {
    await MessageModel.updateOne({ _id: messageId }, { read: true });
  }
}
