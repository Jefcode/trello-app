import { QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface PossibleError {
  response?: {
    data?: {
      message: string;
    };
    status?: number;
  };
  message?: string;
  toString: () => string;
}

export function errorHandler(err: unknown): void {
  const error = err as PossibleError;

  const message: string =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  toast.error(message, {
    id: 'error',
  });
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: errorHandler,
  }),
  defaultOptions: {
    mutations: {
      onError: errorHandler,
    },
  },
});
