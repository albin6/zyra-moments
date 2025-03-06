import { Request, Response } from "express";
import { IDownloadTicketAsPdfController } from "../../../../entities/controllerInterfaces/event/ticket/download-ticket-as-pdf-controller.interface";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../../shared/constants";
import { IDownloadTicketAsPdfUseCase } from "../../../../entities/useCaseInterfaces/event/ticket/download-ticket-as-pdf-usecase.inteface";
import { ZodError } from "zod";
import { CustomError } from "../../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class DownloadTicketAsPdfController
  implements IDownloadTicketAsPdfController
{
  constructor(
    @inject("IDownloadTicketAsPdfUseCase")
    private downloadTicketAsPdfUseCase: IDownloadTicketAsPdfUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { ticketId } = req.params;

      if (!ticketId) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.TICKET_ID_REQUIRED,
        });
        return;
      }

      const { pdfBuffer, fileName } =
        await this.downloadTicketAsPdfUseCase.execute(ticketId);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      res.setHeader("Content-Length", pdfBuffer.length.toString());

      res.status(HTTP_STATUS.OK).send(pdfBuffer);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors,
        });
        return;
      }
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
        return;
      }
      console.log(error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
