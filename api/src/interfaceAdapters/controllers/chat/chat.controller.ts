import { inject, injectable } from "tsyringe";
import { IChatController } from "../../../entities/controllerInterfaces/chat/chat-controller.interface";
import { Server as SocketIOServer, Socket } from "socket.io";
import { IncomingMessage, Server } from "http";
import { Request, Response } from "express";
import { config } from "../../../shared/config";
import { IClientRepository } from "../../../entities/repositoryInterfaces/client/client-respository.interface";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { ISendMessageUseCase } from "../../../entities/useCaseInterfaces/chat/send-message-usecase.interface";
import { IGetChatHistoryUseCase } from "../../../entities/useCaseInterfaces/chat/get-chat-history-usecase.interface";
import { IGetUserChatsUseCase } from "../../../entities/useCaseInterfaces/chat/get-user-chats-usecase.interface";
import { IMarkMessagesAsReadUseCase } from "../../../entities/useCaseInterfaces/chat/mark-messages-as-read-usecase.inteface";
import { IMessageRepository } from "../../../entities/repositoryInterfaces/chat/message-repository.interface";
import { IChatRoomRepository } from "../../../entities/repositoryInterfaces/chat/chat-room-repository.interface";
import { ITokenService } from "../../../useCases/auth/interfaces/token-service.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class ChatController implements IChatController {
  public io?: SocketIOServer;

  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("ISendMessageUseCase")
    private sendMessageUseCase: ISendMessageUseCase,
    @inject("IGetChatHistoryUseCase")
    private getChatHistoryUseCase: IGetChatHistoryUseCase,
    @inject("IGetUserChatsUseCase")
    private getUserChatsUseCase: IGetUserChatsUseCase,
    @inject("IMarkMessagesAsReadUseCase")
    private markMessagesAsReadUseCase: IMarkMessagesAsReadUseCase,
    @inject("IMessageRepository") private messageRepository: IMessageRepository,
    @inject("IChatRoomRepository")
    private chatRoomRepository: IChatRoomRepository,
    @inject("ITokenService") private tokenService: ITokenService
  ) {}

  initialize(server: Server): void {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: config.cors.ALLOWED_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
      },
      path: "/api/v_1/_chat",
      // allowRequest: (
      //   req: IncomingMessage,
      //   callback: (err: string | null | undefined, success: boolean) => void
      // ) => {
      //   const cookies = (req as any).cookies || {};
      //   const tokenNames = ["admin_access_token", "client_access_token", "vendor_access_token"];
      //   let token: string | undefined;

      //   for (const tokenName of tokenNames) {
      //     if (cookies[tokenName]) {
      //       token = cookies[tokenName];
      //       break;
      //     }
      //   }

      //   if (!token) {
      //     return callback(
      //       new CustomError(ERROR_MESSAGES.NO_TOKEN, HTTP_STATUS.UNAUTHORIZED).message,
      //       false
      //     );
      //   }

      //   const decoded = this.tokenService.verifyAccessToken(token);
      //   if (!decoded) {
      //     return callback(
      //       new CustomError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED).message,
      //       false
      //     );
      //   }

      //   (req as CustomRequest).user = {
      //     id: decoded.id as string,
      //     email: decoded.email as string,
      //     role: decoded.role as string,
      //     access_token: "",
      //     refresh_token: ""
      //   };
      //   callback(null, true); // Success
      // },
    });
    this.initializeSocketEvents();
  }

  initializeSocketEvents(): void {
    if (!this.io) throw new Error("Socket.IO not initialized");

    this.io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      socket.on("join", async ({ userId, userType }) => {
        socket.data.userId = userId;
        socket.data.userType = userType;
        socket.join(userId);
        if (userType === "Client") {
          await this.clientRepository.findByIdAndUpdateOnlineStatus(
            userId,
            "online"
          );
        } else {
          await this.vendorRepository.findByIdAndUpdateOnlineStatus(
            userId,
            "online"
          );
        }
        socket.broadcast.emit("userStatus", {
          userId,
          userType,
          status: "online",
        });
      });

      socket.on("messageRead", async ({ chatRoomId, userId, userType }) => {
        try {
          console.log("event received in server");
          await this.markMessagesAsReadUseCase.execute(
            chatRoomId,
            userId,
            userType
          );
          const messages = await this.messageRepository.findByChatRoomId(
            chatRoomId
          );
          const chatRoom = await this.chatRoomRepository.findById(chatRoomId);
          if (!chatRoom) throw new Error("Chat room not found");

          const recipientId =
            userType === "Client" ? chatRoom.vendorId : chatRoom.clientId;
          this.io
            ?.to(userId)
            .to(recipientId.toString())
            .emit("messagesUpdated", messages);
          this.io
            ?.to(userId)
            .to(recipientId.toString())
            .emit("chatUpdate", chatRoom);
        } catch (error) {
          console.error("Error marking messages as read:", error);
          socket.emit("error", { message: "Failed to mark messages as read" });
        }
      });

      socket.on("getUserChats", async ({ userId, userType }) => {
        const chatRooms = await this.getUserChatsUseCase.execute(
          userId,
          userType
        );
        console.log("here is the current chatroom =>", chatRooms);
        socket.emit("userChats", chatRooms);
      });

      socket.on(
        "sendMessage",
        async ({ chatRoomId, senderId, senderType, content }) => {
          const chatRoom = await this.chatRoomRepository.findById(chatRoomId);
          if (!chatRoom) throw new Error("Chat room not found");
          const message = await this.sendMessageUseCase.execute(
            senderType === "Client" ? senderId : chatRoom.clientId.toString(),
            senderType === "Vendor" ? senderId : chatRoom.vendorId.toString(),
            senderId,
            senderType,
            content,
            chatRoomId
          );
          this.io
            ?.to(chatRoom.clientId.toString())
            .to(chatRoom.vendorId.toString())
            .emit("message", message);
          this.io
            ?.to(chatRoom.clientId.toString())
            .to(chatRoom.vendorId.toString())
            .emit("chatUpdate", chatRoom);
        }
      );

      socket.on("getChatHistory", async (chatRoomId: string) => {
        const messages = await this.getChatHistoryUseCase.execute(chatRoomId);
        socket.emit("chatHistory", messages);
      });

      socket.on("disconnect", async () => {
        const { userId, userType } = socket.data;
        if (userId && userType) {
          if (userType === "Client") {
            await this.clientRepository.findByIdAndUpdateOnlineStatus(
              userId,
              "offline"
            );
            socket.broadcast.emit("userStatus", {
              userId,
              userType: "client",
              status: "offline",
            });
          } else {
            await this.vendorRepository.findByIdAndUpdateOnlineStatus(
              userId,
              "offline"
            );
            socket.broadcast.emit("userStatus", {
              userId,
              userType: "vendor",
              status: "offline",
            });
          }
        }
        console.log("User disconnected:", socket.id);
      });
    });
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId, userType } = req.params; // client, client id
      if (
        !userId ||
        !["Client", "Vendor"].includes(
          userType[0].toUpperCase() + userType.slice(1)
        )
      ) {
        res.status(400).json({ error: "Invalid userId or userType" });
        return;
      }
      const User = userType[0].toUpperCase() + userType.slice(1);
      console.log("usertype :>", User);
      const chatRooms = await this.getUserChatsUseCase.execute(
        userId,
        User as "Client" | "Vendor"
      );
      res.status(200).json(chatRooms);
    } catch (error) {
      console.error("Error fetching user chats:", error);
      res.status(500).json({ error: "Failed to fetch chats" });
    }
  }
}
