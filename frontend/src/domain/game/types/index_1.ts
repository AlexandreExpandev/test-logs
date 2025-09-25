/**
 * @file Defines the core types for the game domain.
 */

/**
 * @typedef {'idle' | 'active' | 'finished'}
 * @summary Represents the current state of the game session.
 * - `idle`: The game has not started yet.
 * - `active`: The game is in progress.
 * - `finished`: The game has been won.
 */
export type GameStatus = 'idle' | 'active' | 'finished';

/**
 * @typedef {'higher' | 'lower' | 'correct'}
 * @summary Represents the feedback after a user's guess.
 */
export type GuessFeedback = 'higher' | 'lower' | 'correct';

/**
 * @interface StartGameResult
 * @summary The structure of the data returned from the backend after starting a game.
 */
export interface StartGameResult {
  sessionId: string;
  message: string;
}

/**
 * @interface GuessResult
 * @summary The structure of the data returned from the backend after a guess.
 */
export interface GuessResult {
  feedback: GuessFeedback;
  attempts: number;
  status: GameStatus;
  guess: number;
  secretNumber?: number; // Only included when the game is finished
}

/**
 * @interface GameState
 * @summary The structure of the game state managed by the Zustand store.
 */
export interface GameState {
  sessionId: string | null;
  status: GameStatus;
  attempts: number;
  history: number[];
  feedbackMessage: string;
  minRange: number;
  maxRange: number;
}

/**
 * @interface GameStore
 * @summary The complete structure of the Zustand store, including state and actions.
 */
export interface GameStore extends GameState {
  setConfig: (config: { minRange: number; maxRange: number }) => void;
  startGame: (result: StartGameResult) => void;
  setGuessResult: (result: GuessResult) => void;
  setFeedbackMessage: (message: string) => void;
  resetGame: () => void;
}
