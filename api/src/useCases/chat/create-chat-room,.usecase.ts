import { inject, injectable } from "tsyringe";
import { IChatRoomRepository } from "../../entities/repositoryInterfaces/chat/chat-room-repository.interface";
import { ICreateChatRoomUseCase } from "../../entities/useCaseInterfaces/chat/create-chat-room-usecase.interface";
import { IChatRoomEntity } from "../../entities/models/chat-room.entity";

@injectable()
export class CreateChatRoomUseCase implements ICreateChatRoomUseCase {
  constructor(
    @inject("IChatRoomRepository") private chatRoomRepository: IChatRoomRepository
  ) {}

  async execute(clientId: string, vendorId: string): Promise<IChatRoomEntity> {
    const chatRoom = await this.chatRoomRepository.findOrCreate(
      clientId,
      vendorId,
      "", 
      new Date() 
    );
    return chatRoom;
  }
}