import { Request, Response } from 'express';
import { errorResponse } from '@/utils/responseHandler';

/**
 * @summary
 * Handles requests to routes that do not exist.
 * 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * 
 * @returns {void}
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;
  res.status(404).json(errorResponse(message, 'NOT_FOUND'));
};
