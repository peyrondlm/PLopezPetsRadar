import * as appInsights from 'applicationinsights';
import winston from 'winston';
import { envs } from './envs';

appInsights
  .setup(envs.APPINSIGHTS_CONNECTION_STRING)
  .setSendLiveMetrics(true)
  .setAutoCollectConsole(false)
  .setAutoCollectRequests(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .start();

const aiClient = appInsights.defaultClient;

const appInsightsTransport = new winston.transports.Console({
  level: 'info',
  format: winston.format.printf((obj) => {
    const level = obj.level;
    const message = obj.message;
    const timestamp = obj.timestamp;
    const messageAi = `[${level} ${message} ${timestamp}]`;

    aiClient.trackTrace({
      message: messageAi,
      properties: { timestamp },
    });

    return messageAi;
  }),
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    appInsightsTransport,
  ],
});

export const trackEvent = (name: string, properties?: Record<string, string>) => {
  aiClient.trackEvent({ name, properties });
};

export const trackException = (error: Error, properties?: Record<string, string>) => {
  aiClient.trackException({ exception: error, properties });
};

export const trackMetric = (name: string, value: number) => {
  aiClient.trackMetric({ name, value });
};