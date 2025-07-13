export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message || 'Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message || 'Bad Request');
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message || 'Not Found');
    this.name = 'NotFoundError';
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message || 'Internal Server Error');
    this.name = 'InternalServerError';
  }
}
