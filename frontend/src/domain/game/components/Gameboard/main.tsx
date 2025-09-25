import { Button } from '@/core/components';
import { useGame } from '../../hooks';
import { AttemptsHistory } from '../AttemptsHistory';
import { FeedbackDisplay } from '../FeedbackDisplay';
import { GuessForm } from '../GuessForm';

/**
 * @component Gameboard
 * @summary The main UI component for the GuessNumber game.
 * @domain game
 */
export const Gameboard = () => {
  const {
    status,
    history,
    feedbackMessage,
    minRange,
    maxRange,
    startGame,
    makeGuess,
    isGuessing,
    isStarting,
  } = useGame();

  const isGameFinished = status === 'finished';
  const isGameIdle = status === 'idle';

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
        Adivinhe o Número!
      </h1>

      {(isGameIdle || isGameFinished) && (
        <Button onClick={() => startGame()} disabled={isStarting} size="lg">
          {isStarting
            ? 'Iniciando...'
            : isGameFinished
            ? 'Jogar Novamente'
            : 'Começar a Jogar'}
        </Button>
      )}

      {status !== 'idle' && (
        <>
          <FeedbackDisplay message={feedbackMessage} status={status} />
          <GuessForm
            onSubmit={makeGuess}
            isSubmitting={isGuessing}
            isDisabled={isGameFinished}
            minRange={minRange}
            maxRange={maxRange}
          />
          <AttemptsHistory history={history} />
        </> 
      )}
    </div>
  );
};
