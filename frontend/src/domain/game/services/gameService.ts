import { api } from '@/core/lib/api';
import { GuessResult, StartGameResult } from '../types';

interface GuessPayload {
  sessionId: string;
  guess: number;
}

/**
 * @service gameService
 * @summary Provides methods for interacting with the game API endpoints.
 * @domain game
 * @type api-service
 */

/**
 * @summary Starts a new game session on the server.
 * @returns {Promise<StartGameResult>}
 */
const startGame = async (): Promise<StartGameResult> => {
  return api.post('/internal/game/start');
};

/**
 * @summary Submits a user's guess to the server.
 * @param {GuessPayload} payload The session ID and the number guessed by the user.
 * @returns {Promise<GuessResult>} The result of the guess.
 */
const makeGuess = async (payload: GuessPayload): Promise<GuessResult> => {
  return api.post('/internal/game/guess', payload);
};

export const gameService = {
  startGame,
  makeGuess,
};
