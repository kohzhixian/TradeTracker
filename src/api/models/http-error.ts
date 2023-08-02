export class HttpError extends Error {
  statusCode: number;
  status: string;
  isOperationalError: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperationalError = true; //checks whether it is an operational or programming error

    Error.captureStackTrace(this, this.constructor);
  }
}
