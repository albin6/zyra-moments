import { Request, Response } from "express";

export interface IDeleteWorkSampleByIdController {
  handle(req: Request, res: Response): Promise<void>;
}
