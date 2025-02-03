import { Request, Response } from "express";

export interface IGetAllCategoriesController {
  handle(req: Request, res: Response): Promise<void>;
}
