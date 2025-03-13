// usecases/chat/send-message.usecase.ts
import { injectable, inject } from "tsyringe";
import { IMessageEntity } from "../../entities/models/message.entity";
import { IMessageRepository } from "../../entities/repositoryInterfaces/chat/message-repository.interface";
import { IChatRoomRepository } from "../../entities/repositoryInterfaces/chat/chat-room-repository.interface";
import { ISendMessageUseCase } from "../../entities/useCaseInterfaces/chat/send-message-usecase.interface";

@injectable()
export class SendMessageUseCase implements ISendMessageUseCase {
  constructor(
    @inject("IMessageRepository") private messageRepository: IMessageRepository,
    @inject("IChatRoomRepository") private chatRoomRepository: IChatRoomRepository
  ) {}

  async execute(
    clientId: string,
    vendorId: string,
    senderId: string,
    senderType: "Client" | "Vendor",
    content: string,
    chatRoomId?: string
  ): Promise<IMessageEntity> {
    let chatRoom;
    if (chatRoomId) {
      chatRoom = await this.chatRoomRepository.findById(chatRoomId);
      if (!chatRoom) throw new Error("Chat room not found");
    } else {
      chatRoom = await this.chatRoomRepository.findOrCreate(
        clientId,
        vendorId,
        content,
        new Date()
      );
    }

    const message: IMessageEntity = {
      chatRoomId: chatRoom._id!,
      content,
      senderId,
      senderType,
      read: false,
      createdAt: new Date(),
    };
    const createdMessage = await this.messageRepository.create(message);

    // Update chat room last message
    await this.chatRoomRepository.updateLastMessage(chatRoom._id!, content, new Date());

    return createdMessage;
  }
}