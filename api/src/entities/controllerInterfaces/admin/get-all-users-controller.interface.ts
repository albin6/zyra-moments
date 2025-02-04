import { Request, Response } from "express";

export interface IGetAllUsersController {
  handle(req: Request, res: Response): Promise<void>;
}
