import { Request, Response } from "express";

export interface IGetPaginatedReviewsByVendorIdController {
  handle(req: Request, res: Response): Promise<void>;
}
