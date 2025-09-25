import { Request, Response } from 'express';
import { successResponse } from '@/utils/responseHandler';

/**
 * @summary
 * Handles the health check request.
 * 
 * @function getHandler
 * @module Health
 * 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * 
 * @returns {void}
 */
export function getHandler(_req: Request, res: Response): void {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
  };
  res.status(200).json(successResponse(healthCheck));
}
