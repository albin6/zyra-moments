import { Request, Response } from "express";

export interface IGetPaginatedEventsController {
  handle(req: Request, res: Response): Promise<void>;
}
