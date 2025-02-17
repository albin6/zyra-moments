import { Request, Response } from "express";

export interface IUpdateWorkSampleByIdController {
  handle(req: Request, res: Response): Promise<void>;
}
