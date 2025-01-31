import nodemailer from "nodemailer";
import { IEmailService } from "../../entities/services/email-service.interface";
import { injectable } from "tsyringe";
import { config } from "../../shared/config";
import { VERIFICATION_MAIL_CONTENT } from "../../shared/constants";

@injectable()
export class EmailService implements IEmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.nodemailer.EMAIL_USER,
        pass: config.nodemailer.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, otp: string): Promise<void> {
    const mailOptions = {
      from: "Zyra Moments",
      to,
      subject,
      html: VERIFICATION_MAIL_CONTENT(otp),
    };

    await this.transporter.sendMail(mailOptions);
  }
}
