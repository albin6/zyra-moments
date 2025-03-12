import { IMessageEntity } from "../../models/message.entity";

export interface IGetChatHistoryUseCase {
  execute(chatRoomId: any): Promise<IMessageEntity[]>;
}
