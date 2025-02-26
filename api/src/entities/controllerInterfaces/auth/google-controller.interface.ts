import { Request, Response } from "express";

export interface IGoogleController {
  handle(req: Request, res: Response): Promise<void>;
}
