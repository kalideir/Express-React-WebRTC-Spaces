import express from 'express';
import client from 'prom-client';
import { logger } from './utils';
import config from 'config';

const metricsPort = config.get<number>('metricsPort');

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(metricsPort, () => {
    logger.info(`Metrics server started at http://localhost:${metricsPort}/metrics`);
  });
}
