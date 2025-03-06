import { DownloadTicketPDFResponse } from "../../../models/download-ticket-as-pdf-response.entity";

export interface IDownloadTicketAsPdfUseCase {
  execute(ticketId: string): Promise<DownloadTicketPDFResponse>;
}
