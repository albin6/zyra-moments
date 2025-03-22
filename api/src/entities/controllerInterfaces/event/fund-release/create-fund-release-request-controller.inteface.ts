import { Request, Response } from "express";

export interface ICreateFundReleaseRequestController {
  handle(req: Request, res: Response): Promise<void>;
}
