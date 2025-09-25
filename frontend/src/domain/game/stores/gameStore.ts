import { create } from 'zustand';
import { GameStore, GameState } from '../types';

const initialState: GameState = {
  sessionId: null,
  status: 'idle' as const,
  attempts: 0,
  history: [],
  feedbackMessage: '',
  minRange: 1,
  maxRange: 100,
};

/**
 * @store useGameStore
 * @summary Zustand store for managing the client-side state of the game.
 * @domain game
 * @type domain-store
 * @stateManager zustand
 */
export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setConfig: (config) =>
    set({ minRange: config.minRange, maxRange: config.maxRange }),

  startGame: (result) =>
    set((state) => ({
      sessionId: result.sessionId,
      status: 'active',
      attempts: 0,
      history: [],
      feedbackMessage: `Jogo iniciado! Adivinhe o número entre ${state.minRange} e ${state.maxRange}.`,
    })),

  setGuessResult: (result) =>
    set((state) => {
      let feedbackMessage = '';
      if (result.feedback === 'correct') {
        feedbackMessage = `Você acertou em ${result.attempts} tentativas! O número era ${result.secretNumber}.`;
      } else if (result.feedback === 'higher') {
        feedbackMessage = 'É maior!';
      } else {
        feedbackMessage = 'É menor!';
      }

      return {
        status: result.status,
        attempts: result.attempts,
        history: [...state.history, result.guess],
        feedbackMessage,
      };
    }),

  setFeedbackMessage: (message) => set({ feedbackMessage: message }),

  resetGame: () => set({ ...initialState, minRange: get().minRange, maxRange: get().maxRange }),
}));
