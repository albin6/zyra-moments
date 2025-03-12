import { IMessageEntity } from "../../models/message.entity";

export interface IMessageRepository {
  create(message: IMessageEntity): Promise<IMessageEntity>;

  findByChatRoomId(chatRoomId: any): Promise<IMessageEntity[]>;

  markAsRead(messageId: any): Promise<void>;
}
