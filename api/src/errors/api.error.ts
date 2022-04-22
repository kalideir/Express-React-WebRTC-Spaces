import createError from 'http-errors';

class ApiError {
  public message: string;
  public status: number;
  public originalStack?: string;

  constructor(message, status, stack = null) {
    this.originalStack = stack;
    this.message = message;
    this.status = status;
  }

  static unauthorized(message: string) {
    return new createError.Unauthorized(message);
  }

  static notFound(message: string) {
    return new createError.NotFound(message);
  }

  static badRequest(message: string) {
    return new createError.BadRequest(message);
  }

  static conflict(message: string) {
    return new createError.Conflict(message);
  }

  static forbidden(message: string) {
    return new createError.Forbidden(message);
  }

  static internalServerError(message: string) {
    return new createError.InternalServerError(message);
  }
}

export default ApiError;
