import { ObjectId } from "mongoose";

export interface IChatRoomEntity {
  _id?: string | ObjectId;
  clientId: string | ObjectId;
  vendorId: string | ObjectId;
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
