import { QRCodeGenerationOptions } from "../../interfaceAdapters/services/qr-code.service";

export interface IQrCodeService {
  generateUniqueQRCode(eventId: string, userId: string): string;
  generateQRCodeImage(data: string): Promise<string>;
  generateQRCodePDF(
    qrData: string,
    ticketInfo: {
      ticketId: string;
      eventName: string;
      userName: string;
      eventDate?: string;
      eventLocation?: string;
    }
  ): Promise<Buffer>;
  generateQRCodeBuffer(
    data: string,
    options?: QRCodeGenerationOptions
  ): Promise<Buffer>;
}
