import { inject, injectable } from "tsyringe";
import { IMessageEntity } from "../../entities/models/message.entity";
import { IMessageRepository } from "../../entities/repositoryInterfaces/chat/message-repository.interface";
import { IGetChatHistoryUseCase } from "../../entities/useCaseInterfaces/chat/get-chat-history-usecase.interface";

@injectable()
export class GetChatHistoryUseCase implements IGetChatHistoryUseCase {
  constructor(
    @inject("IMessageRepository") private messageRepository: IMessageRepository
  ) {}
  async execute(chatRoomId: any): Promise<IMessageEntity[]> {
    return this.messageRepository.findByChatRoomId(chatRoomId);
  }
}
