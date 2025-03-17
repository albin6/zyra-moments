import { model, ObjectId } from "mongoose";
import { IChatRoomEntity } from "../../../entities/models/chat-room.entity";
import { chatRoomSchema } from "../schemas/chat-room.schema";

export interface IChatRoomModel
  extends Omit<IChatRoomEntity, "_id" | "clientId" | "vendorId" | "bookingId">,
    Document {
  _id: ObjectId;
  clientId: ObjectId;
  vendorId: ObjectId;
  bookingId: ObjectId;
}

export const ChatRoomModel = model<IChatRoomModel>("ChatRoom", chatRoomSchema);
