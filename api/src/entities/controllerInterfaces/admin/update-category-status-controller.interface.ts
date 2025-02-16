import { Request, Response } from "express";

export interface IUpdateCategoryStatusController {
  handle(req: Request, res: Response): Promise<void>;
}
