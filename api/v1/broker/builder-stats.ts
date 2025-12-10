import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * GET /api/v1/broker/builder-stats - Returns hardcoded builder stats
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: `Method ${req.method} not allowed` },
      timestamp: Date.now(),
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      tvl: 8000000,
    },
  });
}
