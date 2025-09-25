import crypto from 'crypto';
import { GameState, GuessResult, GuessFeedback, GuessValidationError, StartGameResult, GuessPayload } from './types';
import * as configService from '@/services/config';
import { logger } from '@/utils/logger';

// In-memory store for game states, keyed by session ID.
const games = new Map<string, GameState>();

/**
 * @summary
 * Starts a new game session.
 *
 * @function startGame
 * @module Game
 *
 * @returns {Promise<StartGameResult>} An object with the session ID and a confirmation message.
 */
export async function startGame(): Promise<StartGameResult> {
  const { minRange, maxRange } = configService.getGameConfig();

  if (minRange >= maxRange) {
    const error = new Error('Invalid game configuration: minRange must be less than maxRange.') as GuessValidationError;
    error.code = 'INVALID_CONFIG_RANGE';
    throw error;
  }

  const sessionId = crypto.randomUUID();
  const secretNumber = crypto.randomInt(minRange, maxRange + 1);

  const newGame: GameState = {
    sessionId,
    secretNumber,
    minRange,
    maxRange,
    attempts: 0,
    status: 'active',
    history: [],
    startTime: new Date(),
  };

  games.set(sessionId, newGame);

  // Audit log
  logger.info(`New game started for session ${sessionId}`, { sessionId, secretNumber, range: `${minRange}-${maxRange}` });

  return { 
    sessionId,
    message: `New game started. Guess a number between ${minRange} and ${maxRange}. Good luck!` 
  };
}

/**
 * @summary
 * Processes a user's guess, validates it, and updates the game state.
 *
 * @function makeGuess
 * @module Game
 *
 * @param {GuessPayload} payload - The session ID and the user's guessed number.
 *
 * @returns {Promise<GuessResult>} The result of the guess.
 * @throws {GuessValidationError} If the guess is invalid or the game is not active.
 */
export async function makeGuess(payload: GuessPayload): Promise<GuessResult> {
  const { sessionId, guess } = payload;
  const currentGame = games.get(sessionId);

  if (!currentGame || currentGame.status === 'finished') {
    const error = new Error('No active game for this session. Please start a new game.') as GuessValidationError;
    error.code = 'GAME_NOT_ACTIVE';
    throw error;
  }

  if (!Number.isInteger(guess)) {
    const error = new Error('Invalid input. Please enter an integer.') as GuessValidationError;
    error.code = 'INVALID_INTEGER';
    throw error;
  }

  if (guess < currentGame.minRange || guess > currentGame.maxRange) {
    const error = new Error(`The number must be between ${currentGame.minRange} and ${currentGame.maxRange}.`) as GuessValidationError;
    error.code = 'OUT_OF_RANGE';
    throw error;
  }

  currentGame.attempts += 1;
  currentGame.history.push(guess);

  let feedback: GuessFeedback;
  let result: GuessResult;

  if (guess === currentGame.secretNumber) {
    feedback = 'correct';
    currentGame.status = 'finished';
    currentGame.endTime = new Date();
    result = {
      feedback,
      guess,
      attempts: currentGame.attempts,
      status: currentGame.status,
      secretNumber: currentGame.secretNumber,
    };
  } else {
    feedback = guess > currentGame.secretNumber ? 'lower' : 'higher';
    result = {
      feedback,
      guess,
      attempts: currentGame.attempts,
      status: currentGame.status,
    };
  }

  games.set(sessionId, currentGame);
  return result;
}

/**
 * @summary
 * Retrieves the state for a specific game session.
 *
 * @function getGameState
 * @module Game
 *
 * @param {string} sessionId - The ID of the game session.
 * @returns {GameState | null} The game state or null if not found.
 */
export function getGameState(sessionId: string): GameState | null {
  return games.get(sessionId) || null;
}
