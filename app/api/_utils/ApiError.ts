export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error: unknown) {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message =
    error instanceof ApiError ? error.message : 'Internal Server Error';

  const responseBody: { message: string; stack?: string } = {
    message,
  };

  if (process.env.NODE_ENV !== 'production' && error instanceof Error) {
    responseBody['stack'] = error.stack;
  }

  return new Response(JSON.stringify(responseBody), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
}
