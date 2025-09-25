import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { config } from '@/config';
import { logger } from '@/utils/logger';
import { errorHandler } from '@/middleware/errorHandler';
import { notFoundHandler } from '@/middleware/notFoundHandler';
import mainRouter from '@/routes';

const app: Application = express();

// Core Middleware
app.use(helmet());
app.use(cors(config.api.cors));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (config.env !== 'test') {
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
}

// API Routes
app.use('/api', mainRouter);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(config.api.port, () => {
  logger.info(`Server running on port ${config.api.port} in ${config.env} mode`);
});

// Graceful Shutdown
const signals = ['SIGTERM', 'SIGINT'];

const gracefulShutdown = (signal: string) => {
  process.on(signal, () => {
    logger.info(`${signal} received, closing server gracefully.`);
    server.close(() => {
      logger.info('Server closed.');
      // Close database connection here if needed
      process.exit(0);
    });
  });
};

signals.forEach(gracefulShutdown);

export default app;
