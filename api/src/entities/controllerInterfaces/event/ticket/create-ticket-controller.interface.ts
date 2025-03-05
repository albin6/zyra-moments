import { Request, Response } from "express";

export interface ICreateTicketController {
  handle(req: Request, res: Response): Promise<void>;
}
