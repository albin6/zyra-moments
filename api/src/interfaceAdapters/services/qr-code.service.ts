import * as QRCode from "qrcode";
import * as crypto from "crypto";
import { IQrCodeService } from "../../entities/services/qr-code-service.interface";
import { injectable } from "tsyringe";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

export interface QRCodeGenerationOptions {
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  margin?: number;
  width?: number;
  color?: {
    dark: string;
    light: string;
  };
}

@injectable()
export class QrCodeService implements IQrCodeService {
  generateUniqueQRCode(eventId: string, userId: string): string {
    const uniqueString = `${eventId}-${userId}-${Date.now()}-${crypto
      .randomBytes(16)
      .toString("hex")}`;
    return crypto.createHash("sha256").update(uniqueString).digest("hex");
  }

  async generateQRCodeImage(data: string): Promise<string> {
    return QRCode.toDataURL(data);
  }

  async generateQRCodeBuffer(
    data: string,
    options?: QRCodeGenerationOptions
  ): Promise<Buffer> {
    try {
      return await QRCode.toBuffer(data, {
        errorCorrectionLevel: options?.errorCorrectionLevel || "H",
        margin: options?.margin || 1,
        width: options?.width || 300,
        color: options?.color || {
          dark: "#000000",
          light: "#ffffff",
        },
      });
    } catch (error) {
      throw new Error(
        `Failed to generate QR code buffer: ${(error as Error).message}`
      );
    }
  }

  async generateQRCodePDF(
    qrData: string,
    ticketInfo: {
      ticketId: string;
      eventName: string;
      userName: string;
      eventDate?: string;
      eventLocation?: string;
    }
  ): Promise<Buffer> {
    try {
      // Generate QR code as buffer
      const qrBuffer = await this.generateQRCodeBuffer(qrData);

      // Create a PDF document
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title: `Ticket - ${ticketInfo.ticketId}`,
          Author: "Event Ticketing System",
          Subject: `Ticket for ${ticketInfo.eventName}`,
          Keywords: "ticket, event, qr code",
          CreationDate: new Date(),
        },
      });

      // Create a buffer to store the PDF
      const buffers: Buffer[] = [];
      const readable = new Readable();

      // Handle document data
      doc.on("data", (chunk) => buffers.push(chunk));

      // Add title
      doc.fontSize(20).text("EVENT TICKET", {
        align: "center",
      });

      // Add event details
      doc.moveDown().fontSize(14).text(`Event: ${ticketInfo.eventName}`, {
        align: "center",
      });

      // Add ticket details
      doc
        .moveDown()
        .fontSize(12)
        .text(`Ticket ID: ${ticketInfo.ticketId}`, {
          align: "center",
        })
        .moveDown(0.5)
        .text(`Attendee: ${ticketInfo.userName}`, {
          align: "center",
        });

      // Add event date and location if available
      if (ticketInfo.eventDate) {
        doc.moveDown(0.5).text(`Date: ${ticketInfo.eventDate}`, {
          align: "center",
        });
      }

      if (ticketInfo.eventLocation) {
        doc.moveDown(0.5).text(`Location: ${ticketInfo.eventLocation}`, {
          align: "center",
        });
      }

      // Add the QR code image
      const pageWidth = doc.page.width - 2 * doc.page.margins.left;
      const qrSize = 250;
      const x = (pageWidth - qrSize) / 2 + doc.page.margins.left;

      doc.moveDown(2).image(qrBuffer, x, doc.y, {
        width: qrSize,
        height: qrSize,
      });

      // Add instructions
      doc
        .moveDown(2)
        .fontSize(10)
        .text("Please present this QR code at the event for entry.", {
          align: "center",
        });

      // Add timestamp
      doc
        .moveDown(4)
        .fontSize(8)
        .text(`Generated on: ${new Date().toLocaleString()}`, {
          align: "center",
        });

      // End the document
      doc.end();

      // Return a promise that resolves with the complete PDF buffer
      return new Promise<Buffer>((resolve, reject) => {
        doc.on("end", () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

        doc.on("error", (err) => {
          reject(new Error(`PDF generation failed: ${err.message}`));
        });
      });
    } catch (error) {
      throw new Error(`Failed to generate PDF: ${(error as Error).message}`);
    }
  }
}
