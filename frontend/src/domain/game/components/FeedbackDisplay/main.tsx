import { GameStatus } from '../../types';

interface FeedbackDisplayProps {
  message: string;
  status: GameStatus;
}

/**
 * @component FeedbackDisplay
 * @summary Displays feedback messages to the user during the game.
 * @domain game
 */
export const FeedbackDisplay = ({ message, status }: FeedbackDisplayProps) => {
  if (!message) return null;

  const baseClasses = 'text-center text-xl font-semibold p-4 rounded-lg';
  let colorClasses = 'bg-blue-100 text-blue-800';

  if (status === 'finished') {
    colorClasses = 'bg-green-100 text-green-800';
  } else if (message.includes('inválida') || message.includes('deve estar')) {
    colorClasses = 'bg-red-100 text-red-800';
  }

  return <p className={`${baseClasses} ${colorClasses}`}>{message}</p>;
};
