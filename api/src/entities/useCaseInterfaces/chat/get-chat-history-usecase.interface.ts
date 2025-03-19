import { IChatRoomEntity } from "../../models/chat-room.entity";
import { IMessageEntity } from "../../models/message.entity";

export interface IGetChatHistoryUseCase {
  execute(
    chatRoomId: any
  ): Promise<{ chatRoom: IChatRoomEntity; messages: IMessageEntity[] }>;
}
