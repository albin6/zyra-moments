export interface IQrCodeService {
  generateUniqueQRCode(eventId: string, userId: string): string;
  generateQRCodeImage(data: string): Promise<string>;
}
