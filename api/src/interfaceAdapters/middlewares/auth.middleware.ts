import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt-service";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import client from "../../frameworks/cache/redis.client";

const tokenService = new JwtService();

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface CustomRequest extends Request {
  user: CustomJwtPayload;
}

const isBlacklisted = async (token: string): Promise<boolean> => {
  const result = await client.get(token);
  return result !== null;
};

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies.vendor_access_token ||
      req.cookies.client_access_token ||
      req.cookies.admin_access_token;

    if (!token) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }

    if (await isBlacklisted(token)) {
      return res.status(403).json({ message: "Token is blacklisted" });
    }

    const user = tokenService.verifyAccessToken(token) as CustomJwtPayload;

    if (!user || !user.id) {
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: ERROR_MESSAGES.FORBIDDEN });
      return;
    }

    (req as CustomRequest).user = user;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.TOKEN_EXPIRED });
      return;
    }
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    return;
  }
};

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;

    if (!user || !allowedRoles.includes(user.role)) {
      res.status(HTTP_STATUS.FORBIDDEN).json({
        message: ERROR_MESSAGES.FORBIDDEN,
        userRole: user ? user.role : "None",
      });
      return;
    }
    next();
  };
};
