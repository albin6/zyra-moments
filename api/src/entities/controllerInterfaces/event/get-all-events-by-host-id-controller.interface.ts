import { Request, Response } from "express";

export interface IGetAllEventsByHostIdController {
  handle(req: Request, res: Response): Promise<void>;
}
