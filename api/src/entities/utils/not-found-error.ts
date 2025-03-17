import { HTTP_STATUS } from "../../shared/constants";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, HTTP_STATUS.NOT_FOUND);
    this.name = "NotFoundError";
  }
}
