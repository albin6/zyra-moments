import { inject, injectable } from "tsyringe";
import { IMessageEntity } from "../../entities/models/message.entity";
import { IChatRoomRepository } from "../../entities/repositoryInterfaces/chat/chat-room-repository.interface";
import { IMessageRepository } from "../../entities/repositoryInterfaces/chat/message-repository.interface";
import { ISendMessageUseCase } from "../../entities/useCaseInterfaces/chat/send-message-usecase.interface";

@injectable()
export class SendMessageUseCase implements ISendMessageUseCase {
  constructor(
    @inject("IChatRoomRepository")
    private chatRoomRepository: IChatRoomRepository,
    @inject("IMessageRepository") private messageRepository: IMessageRepository
  ) {}
  async execute(
    clientId: any,
    vendorId: any,
    senderId: any,
    senderType: "Client" | "Vendor",
    content: string
  ): Promise<IMessageEntity> {
    const chatRoom = await this.chatRoomRepository.findOrCreate(
      clientId,
      vendorId
    );
    const message: IMessageEntity = {
      chatRoomId: chatRoom._id as any,
      content,
      senderId,
      senderType,
      read: false,
    };
    return this.messageRepository.create(message);
  }
}
