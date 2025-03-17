// frameworks/database/repositories/chat-room.repository.ts
import { injectable } from "tsyringe";
import { IChatRoomEntity } from "../../../entities/models/chat-room.entity";
import { IChatRoomRepository } from "../../../entities/repositoryInterfaces/chat/chat-room-repository.interface";
import {
  ChatRoomModel,
  IChatRoomModel,
} from "../../../frameworks/database/models/chat-room.model";

@injectable()
export class ChatRoomRepository implements IChatRoomRepository {
  async findById(id: any): Promise<IChatRoomEntity | null> {
    return ChatRoomModel.findById(id).exec();
  }

  async findByClientId(clientId: any): Promise<IChatRoomEntity[]> {
    return ChatRoomModel.find({ clientId }).exec();
  }

  async findByVendorId(vendorId: any): Promise<IChatRoomEntity[]> {
    return ChatRoomModel.find({ vendorId }).exec();
  }

  async findOrCreate(
    clientId: any,
    vendorId: any,
    lastMessage: string,
    lastMessageAt: Date
  ): Promise<IChatRoomEntity> {
    let chatRoom = await ChatRoomModel.findOne({ clientId, vendorId }).exec();
    if (!chatRoom) {
      chatRoom = await ChatRoomModel.create({
        clientId,
        vendorId,
        lastMessage,
        lastMessageAt,
      });
    }
    return chatRoom;
  }

  async updateLastMessage(
    chatRoomId: any,
    lastMessage: string,
    lastMessageAt: Date
  ): Promise<void> {
    await ChatRoomModel.updateOne(
      { _id: chatRoomId },
      { lastMessage, lastMessageAt }
    ).exec();
  }

  // latest for chat

  async create(data: {
    clientId: string;
    vendorId: string;
    bookingId: string;
  }): Promise<IChatRoomModel> {
    const chatRoom = new ChatRoomModel({
      clientId: data.clientId,
      vendorId: data.vendorId,
      bookingId: data.bookingId,
      unreadCountClient: 0,
      unreadCountVendor: 0,
    });
    const savedChatRoom = await chatRoom.save();
    return savedChatRoom;
  }

  async findByClientAndVendorAndBooking(
    clientId: string,
    vendorId: string,
    bookingId: string
  ): Promise<IChatRoomModel | null> {
    return await ChatRoomModel.findOne({
      clientId,
      vendorId,
      bookingId,
    }).exec();
  }
}
