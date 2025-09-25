import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGameConfig } from '../../hooks';
import { Button, LoadingSpinner } from '@/core/components';
import { GameConfig } from '../../types';

const configSchema = z
  .object({
    minRange: z.coerce.number().int('O valor mínimo deve ser um número inteiro.'),
    maxRange: z.coerce.number().int('O valor máximo deve ser um número inteiro.'),
  })
  .refine((data) => data.minRange < data.maxRange, {
    message: 'O valor mínimo deve ser menor que o valor máximo.',
    path: ['minRange'],
  });

/**
 * @component ConfigForm
 * @summary A form for administrators to update the game's number range.
 * @domain config
 */
export const ConfigForm = () => {
  const { config, isLoading, updateConfig, isUpdating } = useGameConfig();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GameConfig>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      minRange: 1,
      maxRange: 100,
    },
  });

  useEffect(() => {
    if (config) {
      reset(config);
    }
  }, [config, reset]);

  const onSubmit = (data: GameConfig) => {
    updateConfig(data);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Configuração do Jogo
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="minRange"
            className="block text-sm font-medium text-gray-700"
          >
            Valor Mínimo
          </label>
          <input
            id="minRange"
            type="number"
            {...register('minRange')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.minRange && (
            <p className="mt-2 text-sm text-red-600">{errors.minRange.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="maxRange"
            className="block text-sm font-medium text-gray-700"
          >
            Valor Máximo
          </label>
          <input
            id="maxRange"
            type="number"
            {...register('maxRange')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.maxRange && (
            <p className="mt-2 text-sm text-red-600">{errors.maxRange.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isUpdating} className="w-full">
          {isUpdating ? 'Salvando...' : 'Salvar Configuração'}
        </Button>
      </form>
    </div>
  );
};
