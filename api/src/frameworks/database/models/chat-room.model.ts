import { model, ObjectId } from "mongoose";
import { IChatRoomEntity } from "../../../entities/models/chat-room.entity";
import { chatRoomSchema } from "../schemas/chat-room.schema";

export interface IChatRoomModel
  extends Omit<IChatRoomEntity, "_id" | "clientId" | "vendorId">,
    Document {
  _id: ObjectId;
  clientId: ObjectId;
  vendorId: ObjectId;
}

export const ChatRoomModel = model<IChatRoomModel>("ChatRoom", chatRoomSchema);
