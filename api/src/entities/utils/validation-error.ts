import { HTTP_STATUS } from "../../shared/constants";
import { CustomError } from "./custom-error";

export class ValidationError extends CustomError {
  constructor(message: string, public errors?: any[]) {
    super(message, HTTP_STATUS.BAD_REQUEST);
    this.name = "ValidationError";
  }
}
