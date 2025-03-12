import { IMessageEntity } from "../../models/message.entity";

export interface ISendMessageUseCase {
  execute(
    clientId: any,
    vendorId: any,
    senderId: any,
    senderType: "Client" | "Vendor",
    content: string
  ): Promise<IMessageEntity>;
}
