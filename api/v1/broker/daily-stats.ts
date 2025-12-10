import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { handle500 } from '../../../lib/response.js';

/**
 * GET /api/v1/broker/daily-stats - Proxy for Orderly broker daily stats
 * Returns volume builder daily statistics for the configured broker
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({
        success: false,
        error: { code: 'METHOD_NOT_ALLOWED', message: `Method ${req.method} not allowed` },
        timestamp: Date.now(),
      });
    }

    const brokerId = process.env.ORDERLY_BROKER_ID || 'honeypot';
    const url = `https://api.orderly.org/md/volume/builder/daily_stats?broker_id=${brokerId}`;

    const response = await axios.get(url, { timeout: 30000 });

    // Forward the response as-is
    return res.status(200).json(response.data);

  } catch (error: any) {
    console.error('Broker daily stats API error:', error);

    // If it's an axios error with a response, forward that
    if (error.response?.data) {
      return res.status(error.response.status || 500).json(error.response.data);
    }

    return handle500(res, error);
  }
}
