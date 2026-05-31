import { HttpError } from '@zalib/nest';

export class BadRequestError extends HttpError {
  public code = 'BAD_REQUEST';
  protected readonly statusCode = 400;

  constructor(message?: string, details?: unknown) {
    super(message || 'Bad Request', details);
  }
}

export class ForbiddenError extends HttpError {
  public code = 'FORBIDDEN_ERROR';
  protected readonly statusCode = 403;

  constructor(message?: string, details?: unknown) {
    super(message || 'Forbidden Error', details);
  }
}

export class NotFoundError extends HttpError {
  public code = 'NOT_FOUND';

  protected readonly statusCode = 404;
}

export class ServiceError extends HttpError {
  public readonly code = 'SERVICE_ERROR';
  protected readonly statusCode = 500;

  constructor(message?: string) {
    super(message || 'Service Error');
  }
}
