import { IChatRoomEntity } from "../../models/chat-room.entity";

export interface ICreateChatRoomUseCase {
  execute(clientId: string, vendorId: string): Promise<IChatRoomEntity>;
}
