import { Request, Response } from "express";

export interface IGetAllCategoryJoinRequestController {
  handle(req: Request, res: Response): Promise<void>;
}
