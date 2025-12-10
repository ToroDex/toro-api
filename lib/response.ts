import { VercelResponse } from '@vercel/node';

export function handle500(res: VercelResponse, error: Error) {
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message || 'An unexpected error occurred',
    },
    timestamp: Date.now(),
  });
}
