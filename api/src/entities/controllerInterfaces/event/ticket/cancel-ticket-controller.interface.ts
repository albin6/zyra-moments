import { Request, Response } from "express";

export interface ICancelTicketController {
  handle(req: Request, res: Response): Promise<void>;
}
