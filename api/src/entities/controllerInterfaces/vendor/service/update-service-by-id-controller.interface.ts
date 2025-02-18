import { Request, Response } from "express";

export interface IUpdateServiceByIdController {
  handle(req: Request, res: Response): Promise<void>;
}
