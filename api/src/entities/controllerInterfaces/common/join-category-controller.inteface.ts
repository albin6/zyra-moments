import { Request, Response } from "express";

export interface IJoinCategoryController {
  handle(req: Request, res: Response): Promise<void>;
}
