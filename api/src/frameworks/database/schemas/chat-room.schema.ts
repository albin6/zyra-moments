import { Schema } from "mongoose";
import { IChatRoomModel } from "../models/chat-room.model";

export const chatRoomSchema = new Schema<IChatRoomModel>(
  {
    clientId: { type: Schema.Types.ObjectId, required: true },
    vendorId: { type: Schema.Types.ObjectId, required: true },
    lastMessage: { type: String, required: false }, 
    lastMessageAt: { type: Date, required: false },
    unreadCount: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);
