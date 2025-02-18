import { Request, Response } from "express";

export interface IGetVendorsUnderCategoryController {
  handle(req: Request, res: Response): Promise<void>;
}
