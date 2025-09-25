import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/responseHandler';
import * as configService from '@/services/config';

const configUpdateSchema = z.object({
  minRange: z.number().int('minRange must be an integer.'),
  maxRange: z.number().int('maxRange must be an integer.'),
}).refine(data => data.minRange < data.maxRange, {
  message: 'minRange must be strictly less than maxRange.',
  path: ['minRange'], // or ['maxRange']
});

/**
 * @summary
 * Retrieves the current game configuration.
 *
 * @function getHandler
 * @module Config
 *
 * @param {Request} _req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 *
 * @returns {Promise<void>}
 */
export async function getHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const config = configService.getGameConfig();
    res.status(200).json(successResponse(config));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Updates the game configuration.
 *
 * @function putHandler
 * @module Config
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 *
 * @returns {Promise<void>}
 */
export async function putHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedBody = configUpdateSchema.parse(req.body);
    const updatedConfig = configService.updateGameConfig(validatedBody);
    res.status(200).json(successResponse(updatedConfig));
  } catch (error) {
    next(error);
  }
}
