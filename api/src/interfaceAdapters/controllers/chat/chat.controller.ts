import { inject, injectable } from "tsyringe";
import { IChatController } from "../../../entities/controllerInterfaces/chat/chat-controller.interface";
import { Server as SocketIOServer, DefaultEventsMap, Socket } from "socket.io";
import { Server } from "http";
import { Request, Response } from "express";
import { config } from "../../../shared/config";
import { IClientRepository } from "../../../entities/repositoryInterfaces/client/client-respository.interface";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { ISendMessageUseCase } from "../../../entities/useCaseInterfaces/chat/send-message-usecase.interface";
import { IGetChatHistoryUseCase } from "../../../entities/useCaseInterfaces/chat/get-chat-history-usecase.interface";
import { IGetUserChatsUseCase } from "../../../entities/useCaseInterfaces/chat/get-user-chats-usecase.interface";

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
    private getUserChatsUseCase: IGetUserChatsUseCase
  ) {}

  initialize(server: Server): void {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: config.cors.ALLOWED_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    this.initializeSocketEvents();
  }

  initializeSocketEvents(): void {
    if (!this.io) throw new Error("Socket.IO not initialized");

    this.io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      socket.on(
        "join",
        async ({
          userId,
          userType,
        }: {
          userId: string;
          userType: "Client" | "Vendor";
        }) => {
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
        }
      );

      socket.on(
        "sendMessage",
        async ({
          clientId,
          vendorId,
          senderId,
          senderType,
          content,
          chatRoomId, // Add chatRoomId
        }: {
          clientId: string;
          vendorId: string;
          senderId: string;
          senderType: "Client" | "Vendor";
          content: string;
          chatRoomId?: string; // Optional
        }) => {
          const message = await this.sendMessageUseCase.execute(
            clientId,
            vendorId,
            senderId,
            senderType,
            content,
            chatRoomId as string
          );
          const chatRoom = await this.getChatHistoryUseCase.execute(message.chatRoomId);
          this.io
            ?.to(clientId.toString())
            .to(vendorId.toString())
            .emit("message", message);
          this.io
            ?.to(clientId.toString())
            .to(vendorId.toString())
            .emit("chatUpdate", chatRoom);
        }
      );

      socket.on("getChatHistory", async (chatRoomId: string) => {
        const messages = await this.getChatHistoryUseCase.execute(chatRoomId);
        socket.emit("chatHistory", messages);
      });

      socket.on("disconnect", async () => {
        const userId = Array.from(socket.rooms)[1];
        if (userId) {
          const client = await this.clientRepository.findById(userId);
          if (client) {
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
            const vendor = await this.vendorRepository.findById(userId);
            if (vendor) {
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
