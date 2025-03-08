import { Request, Response } from "express";

export interface IGetEventAttendanceController {
  handle(req: Request, res: Response): Promise<void>;
}
