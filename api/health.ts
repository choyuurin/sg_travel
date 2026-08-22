import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).json({
    status: 'ok',
    service: 'SG Travel Backend API',
    platform: 'Vercel Serverless',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    endpoints: {
      aggregatedTelemetry: '/api/telemetry/live',
      carparks: '/api/telemetry/carparks',
      taxis: '/api/telemetry/taxis',
      govV2: [
        '/api/gov/two-hr-forecast',
        '/api/gov/twenty-four-hr-forecast',
        '/api/gov/four-day-outlook',
        '/api/gov/air-temperature',
        '/api/gov/rainfall',
        '/api/gov/psi',
        '/api/gov/pm25',
        '/api/gov/uv',
        '/api/gov/relative-humidity',
        '/api/gov/wind-speed',
      ],
      govV1: [
        '/api/gov/carpark-availability',
        '/api/gov/taxi-availability',
      ],
    },
  });
}
