import { Request, Response } from "express";

export interface IUpdateFundReleaseRequestStatusController {
  handle(req: Request, res: Response): Promise<void>;
}
