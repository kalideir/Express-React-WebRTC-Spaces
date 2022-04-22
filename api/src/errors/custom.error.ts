import createError from 'http-errors';

export type ErrorExtra = {
  error?: string;
};

class CustomError {
  public message: string;
  public status: number;
  public extra?: ErrorExtra;
  public originalStack?: string;

  constructor(message, status, extra, stack = null) {
    // super(message);
    this.originalStack = stack;
    this.message = message;
    this.status = status;
    this.extra = extra;
  }
}

export default CustomError;
