import { Request, Response } from "express";

export interface ICreateReviewController {
  handle(req: Request, res: Response): Promise<void>;
}
