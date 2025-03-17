import { IChatRoomModel } from "../../../frameworks/database/models/chat-room.model";
import { IChatRoomEntity } from "../../models/chat-room.entity";

export interface IChatRoomRepository {
  findOrCreate(
    clientId: any,
    vendorId: any,
    lastMessage: string,
    lastMessageAt: Date
  ): Promise<IChatRoomEntity>;

  findById(id: any): Promise<IChatRoomEntity | null>;

  findByClientId(clientId: any): Promise<IChatRoomEntity[]>;

  findByVendorId(vendorId: any): Promise<IChatRoomEntity[]>;

  updateLastMessage(
    chatRoomId: any,
    lastMessage: string,
    lastMessageAt: Date
  ): Promise<void>;

  // latest for chat

  findByClientAndVendorAndBooking(
    clientId: string,
    vendorId: string,
    bookingId: string
  ): Promise<IChatRoomModel | null>;
  create(data: {
    clientId: string;
    vendorId: string;
    bookingId: string;
  }): Promise<IChatRoomModel>;
}
