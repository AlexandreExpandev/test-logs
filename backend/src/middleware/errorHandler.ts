import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '@/utils/logger';
import { errorResponse } from '@/utils/responseHandler';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * @summary
 * Global error handling middleware.
 * 
 * @param {AppError} err - The error object.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} _next - Express next function.
 * 
 * @returns {void}
 */
export const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction): void => {
  logger.error(err.message, { stack: err.stack, path: req.path });

  if (err instanceof ZodError) {
    res.status(400).json(errorResponse('Validation Error', 'VALIDATION_ERROR', err.errors));
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'An unexpected error occurred.';
  const code = err.name.toUpperCase().replace(/ /g, '_');

  res.status(statusCode).json(errorResponse(message, code));
};
