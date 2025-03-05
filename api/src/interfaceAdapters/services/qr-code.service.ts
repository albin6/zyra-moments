import * as QRCode from "qrcode";
import * as crypto from "crypto";
import { IQrCodeService } from "../../entities/services/qr-code-service.interface";

export class QRCodeService implements IQrCodeService {
  generateUniqueQRCode(eventId: string, userId: string): string {
    const uniqueString = `${eventId}-${userId}-${Date.now()}-${crypto
      .randomBytes(16)
      .toString("hex")}`;
    return crypto.createHash("sha256").update(uniqueString).digest("hex");
  }

  async generateQRCodeImage(data: string): Promise<string> {
    return QRCode.toDataURL(data);
  }
}
