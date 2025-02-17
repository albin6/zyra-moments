import { Request, Response } from "express";

export interface IGetWorkSampleByIdController {
  handle(req: Request, res: Response): Promise<void>;
}
