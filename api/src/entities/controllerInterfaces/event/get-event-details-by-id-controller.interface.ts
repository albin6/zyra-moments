import { Request, Response } from "express";

export interface IGetEventDetailsByIdController {
  handle(req: Request, res: Response): Promise<void>;
}
