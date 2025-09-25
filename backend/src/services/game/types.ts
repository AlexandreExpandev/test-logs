export type GameStatus = 'active' | 'finished';

export type GuessFeedback = 'higher' | 'lower' | 'correct';

export interface GameState {
  sessionId: string;
  secretNumber: number;
  minRange: number;
  maxRange: number;
  attempts: number;
  status: GameStatus;
  history: number[];
  startTime: Date;
  endTime?: Date;
}

export interface StartGameResult {
  sessionId: string;
  message: string;
}

export interface GuessPayload {
  sessionId: string;
  guess: number;
}

export interface GuessResult {
  feedback: GuessFeedback;
  attempts: number;
  status: GameStatus;
  guess: number;
  secretNumber?: number; // Only included when the game is finished
}

export interface GuessValidationError extends Error {
  code: string;
}
