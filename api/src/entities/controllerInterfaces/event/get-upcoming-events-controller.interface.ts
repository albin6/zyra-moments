import { Request, Response } from "express";

export interface IGetUpcomingEventsController {
  handle(req: Request, res: Response): Promise<void>;
}
