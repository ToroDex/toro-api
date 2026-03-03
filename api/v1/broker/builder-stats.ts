import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { handle500 } from '../../../lib/response.js';

/**
 * GET /api/v1/broker/builder-stats - Returns builder stats including connected users from Orderly
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: { code: 'METHOD_NOT_ALLOWED', message: `Method ${req.method} not allowed` },
      timestamp: Date.now(),
    });
  }

  try {
    const brokerId = process.env.ORDERLY_BROKER_ID || 'toroperp';
    const url = `https://api.orderly.org/v1/public/broker/stats?broker_id=${brokerId}`;

    const response = await axios.get(url, { timeout: 30000 });
    const connectedUser = response.data?.data?.connected_user ?? 0;

    return res.status(200).json({
      success: true,
      data: {
        tvl: 8000000,
        connected_user: connectedUser,
      },
    });
  } catch (error: any) {
    console.error('Builder stats API error:', error);
    return handle500(res, error);
  }
}
