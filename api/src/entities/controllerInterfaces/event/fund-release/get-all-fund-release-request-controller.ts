import { Request, Response } from "express";

export interface IGetAllFundReleaseRequestController {
  handle(req: Request, res: Response): Promise<void>;
}
