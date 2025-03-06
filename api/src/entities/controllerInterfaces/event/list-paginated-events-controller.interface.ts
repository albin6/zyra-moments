import { Request, Response } from "express";

export interface IListPaginatedEventsController {
  handle(req: Request, res: Response): Promise<void>;
}
