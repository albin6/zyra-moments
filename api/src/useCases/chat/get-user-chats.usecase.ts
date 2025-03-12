import { inject, injectable } from "tsyringe";
import { IChatRoomEntity } from "../../entities/models/chat-room.entity";
import { IChatRoomRepository } from "../../entities/repositoryInterfaces/chat/chat-room-repository.interface";
import {
  ChatRoomResponse,
  IGetUserChatsUseCase,
} from "../../entities/useCaseInterfaces/chat/get-user-chats-usecase.interface";
import { IMessageEntity } from "../../entities/models/message.entity";
import { IMessageRepository } from "../../entities/repositoryInterfaces/chat/message-repository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";

@injectable()
export class GetUserChatsUseCase implements IGetUserChatsUseCase {
  constructor(
    @inject("IChatRoomRepository")
    private chatRoomRepository: IChatRoomRepository,
    @inject("IMessageRepository")
    private messageRepository: IMessageRepository,
    @inject("IVendorRepository")
    private vendorRepository: IVendorRepository,
    @inject("IClientRepository")
    private clientRepository: IClientRepository
  ) {}

  async execute(
    userId: string,
    userType: "Client" | "Vendor"
  ): Promise<ChatRoomResponse[]> {
    const chatRooms: IChatRoomEntity[] =
      userType === "Client"
        ? await this.chatRoomRepository.findByClientId(userId)
        : await this.chatRoomRepository.findByVendorId(userId);

    if (!chatRooms.length) {
      return [];
    }

    const responses: ChatRoomResponse[] = await Promise.all(
      chatRooms.map(async (room) => {
        const otherPartyId =
          userType === "Client" ? room.vendorId : room.clientId;

        const otherParty =
          userType === "Client"
            ? await this.vendorRepository.findByIdForChat(otherPartyId)
            : await this.clientRepository.findByIdForChat(otherPartyId);

        if (!otherParty) {
          throw new CustomError(
            ERROR_MESSAGES.USER_NOT_FOUND,
            HTTP_STATUS.NOT_FOUND
          );
        }

        const messages: IMessageEntity[] =
          await this.messageRepository.findByChatRoomId(room._id!);

        const lastMessage = messages.find((m) => m.chatRoomId === room._id) || {
          content: room.lastMessage || "",
          createdAt: room.createdAt,
        };

        return {
          id: otherPartyId,
          name:
            `${otherParty.firstName} ${otherParty.lastName}` || "Unknown User",
          avatar:
            otherParty.profileImage || "/placeholder.svg?height=48&width=48",
          lastMessage: lastMessage.content,
          lastMessageTime: new Date(lastMessage.createdAt!),
          unreadCount: messages.filter(
            (m) =>
              m.chatRoomId === room._id &&
              m.senderType === (userType === "Client" ? "Vendor" : "Client") &&
              !m.read
          ).length,
          status: "offline",
          chatRoomId: room._id! as any,
        };
      })
    );

    console.log("responses from usecase", responses);

    return responses;
  }
}
