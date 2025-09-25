import { useState, FormEvent, useMemo } from 'react';
import { z } from 'zod';
import { Button } from '@/core/components';

interface GuessFormProps {
  onSubmit: (guess: number) => void;
  isSubmitting: boolean;
  isDisabled: boolean;
  minRange: number;
  maxRange: number;
}

/**
 * @component GuessForm
 * @summary Form for the user to input and submit their guess.
 * @domain game
 */
export const GuessForm = ({
  onSubmit,
  isSubmitting,
  isDisabled,
  minRange,
  maxRange,
}: GuessFormProps) => {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState<string | null>(null);

  const guessSchema = useMemo(() => {
    return z.coerce
      .number()
      .int('Entrada inválida. Por favor, insira um número inteiro.')
      .min(minRange, `O número deve estar entre ${minRange} e ${maxRange}.`)
      .max(maxRange, `O número deve estar entre ${minRange} e ${maxRange}.`);
  }, [minRange, maxRange]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = guessSchema.safeParse(guess);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    onSubmit(result.data);
    setGuess('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full max-w-md"
    >
      <div className="w-full">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={isDisabled || isSubmitting}
          placeholder={`Digite um número entre ${minRange} e ${maxRange}`}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          aria-label="Campo para inserir o palpite"
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
      <Button type="submit" disabled={isDisabled || isSubmitting} size="lg">
        {isSubmitting ? 'Enviando...' : 'Adivinhar'}
      </Button>
    </form>
  );
};
