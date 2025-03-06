import { Request, Response } from "express";

export interface IDownloadTicketAsPdfController {
  handle(req: Request, res: Response): Promise<void>;
}
