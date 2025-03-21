import { Request, Response } from "express";

export interface IGetAllBookingController {
  handle(req: Request, res: Response): Promise<void>;
}
