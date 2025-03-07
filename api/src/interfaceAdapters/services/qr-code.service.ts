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

      // Handle document data
      doc.on("data", (chunk) => buffers.push(chunk));

      // Add border to the whole page
      doc
        .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
        .lineWidth(1)
        .stroke();

      // Add header background
      doc
        .rect(30, 30, doc.page.width - 60, 80)
        .fillAndStroke("#f0f0f0", "#cccccc");

      // Add title
      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .fillColor("#333333")
        .text("EVENT TICKET", 50, 60, {
          align: "center",
          width: doc.page.width - 100,
        });

      // Add event name
      doc
        .fontSize(18)
        .font("Helvetica")
        .fillColor("#333333")
        .text(ticketInfo.eventName, 50, 85, {
          align: "center",
          width: doc.page.width - 100,
        });

      // Add horizontal separator line
      doc
        .moveTo(50, 140)
        .lineTo(doc.page.width - 50, 140)
        .lineWidth(1)
        .stroke("#cccccc");

      // Add ticket details section
      const detailsY = 170;
      const leftColumnX = 70;
      const rightColumnX = 370;

      // Left column - Ticket info
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#555555")
        .text("TICKET DETAILS", leftColumnX, detailsY);

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor("#333333")
        .text(`Ticket ID:`, leftColumnX, detailsY + 25)
        .font("Helvetica-Bold")
        .text(ticketInfo.ticketId, leftColumnX + 70, detailsY + 25);

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor("#333333")
        .text(`Attendee:`, leftColumnX, detailsY + 45)
        .font("Helvetica-Bold")
        .text(ticketInfo.userName, leftColumnX + 70, detailsY + 45);

      // Right column - Event info
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#555555")
        .text("EVENT DETAILS", rightColumnX, detailsY);

      if (ticketInfo.eventDate) {
        doc
          .font("Helvetica")
          .fontSize(11)
          .fillColor("#333333")
          .text(`Date:`, rightColumnX, detailsY + 25)
          .font("Helvetica-Bold")
          .text(ticketInfo.eventDate, rightColumnX + 50, detailsY + 25);
      }

      if (ticketInfo.eventLocation) {
        doc
          .font("Helvetica")
          .fontSize(11)
          .fillColor("#333333")
          .text(`Location:`, rightColumnX, detailsY + 45)
          .font("Helvetica-Bold")
          .text(ticketInfo.eventLocation, rightColumnX + 70, detailsY + 45);
      }

      // Add the QR code image with a border
      const pageWidth = doc.page.width - 2 * doc.page.margins.left;
      const qrSize = 200;
      const x = (pageWidth - qrSize) / 2 + doc.page.margins.left;
      const qrY = detailsY + 100;

      // QR code border
      doc
        .rect(x - 10, qrY - 10, qrSize + 20, qrSize + 20)
        .lineWidth(1)
        .stroke("#cccccc");

      // QR code
      doc.image(qrBuffer, x, qrY, {
        width: qrSize,
        height: qrSize,
      });

      // Add instructions
      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor("#555555")
        .text(
          "Please present this QR code at the event entrance for admission.",
          50,
          qrY + qrSize + 30,
          {
            align: "center",
            width: doc.page.width - 100,
          }
        );

      // Add footer
      const footerY = doc.page.height - 100;

      // Footer separator line
      doc
        .moveTo(50, footerY)
        .lineTo(doc.page.width - 50, footerY)
        .lineWidth(1)
        .stroke("#cccccc");

      // Footer text
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#888888")
        .text(
          `Generated on: ${new Date().toLocaleString()}`,
          50,
          footerY + 15,
          {
            align: "center",
            width: doc.page.width - 100,
          }
        );

      doc
        .fontSize(8)
        .text(
          "This ticket is subject to the terms and conditions of the event. Non-transferable and non-refundable.",
          50,
          footerY + 30,
          {
            align: "center",
            width: doc.page.width - 100,
          }
        );

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
