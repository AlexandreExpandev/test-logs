import { Router } from 'express';
import * as startController from '@/api/internal/game/start/controller';
import * as guessController from '@/api/internal/game/guess/controller';

const router = Router();

/**
 * @api {post} /api/internal/game/start Start a new game
 * @apiName StartGame
 * @apiGroup Game
 * @apiVersion 1.0.0
 * @apiDescription Initializes a new game session with a random secret number.
 * @apiSuccess {String} sessionId A unique identifier for the game session.
 * @apiSuccess {String} message Confirmation message.
 */
router.post('/start', startController.postHandler);

/**
 * @api {post} /api/internal/game/guess Submit a guess
 * @apiName SubmitGuess
 * @apiGroup Game
 * @apiVersion 1.0.0
 * @apiDescription Submits a numeric guess and receives feedback.
 * @apiParam {String} sessionId The ID of the current game session.
 * @apiParam {Number} guess The user's guess.
 * @apiSuccess {String} feedback Result of the guess ('higher', 'lower', 'correct').
 * @apiSuccess {Number} attempts Total attempts made.
 * @apiSuccess {String} status Current game status ('active', 'finished').
 * @apiSuccess {Number} guess The number that was guessed.
 * @apiSuccess {Number} [secretNumber] The secret number (only on 'correct' feedback).
 * @apiError {String} code Error code (e.g., 'GAME_NOT_ACTIVE', 'OUT_OF_RANGE').
 * @apiError {String} message Error description.
 */
router.post('/guess', guessController.postHandler);

export default router;
