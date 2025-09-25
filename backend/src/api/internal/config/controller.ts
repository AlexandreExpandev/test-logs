import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse } from '@/utils/responseHandler';
import * as configService from '@/services/config';

const configUpdateSchema = z.object({
  minRange: z.number({
    required_error: 'minRange is required.',
    invalid_type_error: 'minRange must be an integer.',
  }).int(),
  maxRange: z.number({
    required_error: 'maxRange is required.',
    invalid_type_error: 'maxRange must be an integer.',
  }).int(),
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
 * @returns {void}
 */
export function getHandler(_req: Request, res: Response, next: NextFunction): void {
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
    const validatedBody = await configUpdateSchema.parseAsync(req.body);
    const updatedConfig = configService.updateGameConfig(validatedBody);
    res.status(200).json(successResponse(updatedConfig));
  } catch (error) {
    next(error);
  }
}
