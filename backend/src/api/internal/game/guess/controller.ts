import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/responseHandler';
import * as gameService from '@/services/game';
import { GuessValidationError } from '@/services/game';

const guessSchema = z.object({
  body: z.object({
    sessionId: z.string({
      required_error: 'sessionId is required.',
    }).uuid('sessionId must be a valid UUID.'),
    guess: z.number({
      required_error: 'Guess is required.',
      invalid_type_error: 'Guess must be a number.',
    }),
  }),
});

/**
 * @summary
 * Handles the user's guess submission.
 *
 * @function postHandler
 * @module Game
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 *
 * @returns {Promise<void>}
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedRequest = await guessSchema.parseAsync({ body: req.body });
    const { sessionId, guess } = validatedRequest.body;

    const result = await gameService.makeGuess({ sessionId, guess });

    res.status(200).json(successResponse(result));
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      const validationError = error as GuessValidationError;
      res.status(400).json(errorResponse(validationError.message, validationError.code));
      return;
    }
    next(error);
  }
}
