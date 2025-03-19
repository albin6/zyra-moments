import { IMessageEntity } from "../../../entities/models/message.entity";
import { IMessageRepository } from "../../../entities/repositoryInterfaces/chat/message-repository.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { MessageModel } from "../../../frameworks/database/models/message.model";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

export class MessageRepository implements IMessageRepository {
  async create(message: IMessageEntity): Promise<IMessageEntity> {
    return await MessageModel.create(message);
  }

  async findByChatRoomId(chatRoomId: any): Promise<IMessageEntity[]> {
    return await MessageModel.find({ chatRoomId }).sort({ createdAt: 1 }).exec();
  }

  async markAsRead(
    chatRoomId: string,
    userId: string,
    userType: "Client" | "Vendor"
  ): Promise<void> {
    try {
      await MessageModel.updateMany(
        {
          chatRoomId,
          senderId: { $ne: userId },
          senderType: userType === "Client" ? "Vendor" : "Client",
          read: false,
        },
        { $set: { read: true } }
      ).exec();
    } catch (error) {
      console.error(
        `Error marking messages as read for chatRoom ${chatRoomId}:`,
        error
      );
      throw new CustomError(
        ERROR_MESSAGES.FAILED_TO_MARK_ATTENDANCE,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }
}
