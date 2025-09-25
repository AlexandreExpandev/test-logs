import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { gameService } from '../../services';
import { useGameStore } from '../../stores';
import { configService } from '@/domain/config/services';

/**
 * @hook useGame
 * @summary Manages game logic, state, and API interactions.
 * @domain game
 * @type domain-hook
 */
export const useGame = () => {
  const {
    sessionId,
    status,
    attempts,
    history,
    feedbackMessage,
    minRange,
    maxRange,
    setConfig,
    startGame: startStoreGame,
    setGuessResult,
    setFeedbackMessage,
    resetGame,
  } = useGameStore();

  const { data: config } = useQuery({
    queryKey: ['gameConfig'],
    queryFn: configService.getGameConfig,
    staleTime: Infinity, // Config doesn't change often
  });

  useEffect(() => {
    if (config) {
      setConfig(config);
    }
  }, [config, setConfig]);

  const startMutation = useMutation({
    mutationFn: gameService.startGame,
    onSuccess: (data) => {
      startStoreGame(data);
    },
    onError: (error) => {
      toast.error(`Erro ao iniciar o jogo: ${error.message}`);
      resetGame();
    },
  });

  const guessMutation = useMutation({
    mutationFn: (guess: number) => {
      if (!sessionId) {
        throw new Error('Session ID is missing.');
      }
      return gameService.makeGuess({ sessionId, guess });
    },
    onSuccess: (data) => {
      setGuessResult(data);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
      setFeedbackMessage(error.message); // Also show in the feedback area
    },
  });

  return {
    // State
    status,
    attempts,
    history,
    feedbackMessage,
    minRange,
    maxRange,

    // Mutations
    startGame: startMutation.mutate,
    makeGuess: guessMutation.mutate,

    // Loading States
    isStarting: startMutation.isPending,
    isGuessing: guessMutation.isPending,

    // Actions
    resetGame,
  };
};
