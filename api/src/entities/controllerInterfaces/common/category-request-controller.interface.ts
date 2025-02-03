import { Request, Response } from "express";

export interface ICategoryRequestController {
  handle(req: Request, res: Response): Promise<void>;
}
