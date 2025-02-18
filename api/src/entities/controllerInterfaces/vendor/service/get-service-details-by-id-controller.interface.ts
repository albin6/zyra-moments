import { Request, Response } from "express";

export interface IGetServiceDetailsByIdController {
  handle(req: Request, res: Response): Promise<void>;
}
