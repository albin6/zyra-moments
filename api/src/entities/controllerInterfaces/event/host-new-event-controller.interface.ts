import { Request, Response } from "express";

export interface IHostNewEventController {
  handle(req: Request, res: Response): Promise<void>;
}
