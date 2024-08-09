import { NextRequest } from 'next/server';
import { handleApiError } from './ApiError';

type ApiHandler<T> = (req: NextRequest, params: T) => Promise<Response> | Response;

export function withErrorHandling<T>(handler: ApiHandler<T>): ApiHandler<T> {
  return async (req: NextRequest, params: T) => {
    try {
      return await handler(req, params);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
