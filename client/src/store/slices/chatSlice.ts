// slices/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: string; // clientId or vendorId
  chatRoomId: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  status?: "online" | "offline";
}

interface Message {
  _id: string;
  chatRoomId: string;
  content: string;
  senderId: string;
  senderType: "Client" | "Vendor";
  read: boolean;
  createdAt: Date;
}

interface ChatState {
  contacts: Contact[];
  messages: { [chatRoomId: string]: Message[] };
  selectedChatRoomId: string | null;
}

const initialState: ChatState = {
  contacts: [],
  messages: {},
  selectedChatRoomId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    setMessages: (state, action: PayloadAction<{ chatRoomId: string; messages: Message[] }>) => {
      state.messages[action.payload.chatRoomId] = action.payload.messages;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const messages = state.messages[action.payload.chatRoomId] || [];
      state.messages[action.payload.chatRoomId] = [...messages, action.payload];
    },
    setSelectedChatRoomId: (state, action: PayloadAction<string | null>) => {
      state.selectedChatRoomId = action.payload;
    },
    updateContactStatus: (state, action: PayloadAction<{ contactId: string; status: "online" | "offline" }>) => {
      state.contacts = state.contacts.map((contact) =>
        contact.id === action.payload.contactId ? { ...contact, status: action.payload.status } : contact
      );
    },
  },
});

export const { setContacts, setMessages, addMessage, setSelectedChatRoomId, updateContactStatus } = chatSlice.actions;
export default chatSlice.reducer;