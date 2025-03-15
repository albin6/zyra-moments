import { Request, Response } from "express";

export interface IGetAllTicketsByUserIdController {
  handle(req: Request, res: Response): Promise<void>;
}
