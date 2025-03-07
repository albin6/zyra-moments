import { Request, Response } from "express";

export interface IUpdateEventDetailsByIdController {
  handle(req: Request, res: Response): Promise<void>;
}
