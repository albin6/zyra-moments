import { Request, Response } from "express";

export interface IMarkAttendanceController {
  handle(req: Request, res: Response): Promise<void>;
}
