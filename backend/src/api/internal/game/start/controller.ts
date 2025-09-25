import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/responseHandler';
import * as gameService from '@/services/game';

/**
 * @summary
 * Handles the request to start a new game.
 *
 * @function postHandler
 * @module Game
 *
 * @param {Request} _req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 *
 * @returns {Promise<void>}
 */
export async function postHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await gameService.startGame();
    res.status(201).json(successResponse(result));
  } catch (error) {
    next(error);
  }
}
