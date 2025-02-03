import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt-service";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

const tokenService = new JwtService();

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface CustomRequest extends Request {
  user: CustomJwtPayload;
}

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
    return;
  }

  const user = tokenService.verifyAccessToken(token) as CustomJwtPayload;
  if (!user) {
    res
      .status(HTTP_STATUS.FORBIDDEN)
      .json({ message: ERROR_MESSAGES.FORBIDDEN });
    return;
  }
  (req as CustomRequest).user = user;
  next();
};

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;

    if (!user || !allowedRoles.includes(user.role)) {
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: ERROR_MESSAGES.FORBIDDEN });
      return;
    }
    next();
  };
};
