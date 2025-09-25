import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, LoadingSpinner } from '@/core/components';
import { useGameConfig, useUpdateGameConfig } from '../../hooks';
import { GameConfig } from '../../types';

const configSchema = z
  .object({
    minRange: z.coerce.number({ invalid_type_error: 'Deve ser um número inteiro.' }).int(),
    maxRange: z.coerce.number({ invalid_type_error: 'Deve ser um número inteiro.' }).int(),
  })
  .refine((data) => data.minRange < data.maxRange, {
    message: 'O valor mínimo deve ser menor que o valor máximo.',
    path: ['minRange'], // You can also apply this to 'maxRange' or make it a form-level error
  });

/**
 * @component ConfigForm
 * @summary A form for administrators to update game settings like min/max range.
 * @domain config
 */
export const ConfigForm = () => {
  const { data: config, isLoading, isError } = useGameConfig();
  const { mutate: updateConfig, isPending: isUpdating } = useUpdateGameConfig();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GameConfig>({
    resolver: zodResolver(configSchema),
  });

  useEffect(() => {
    if (config) {
      reset(config);
    }
  }, [config, reset]);

  const onSubmit = (data: GameConfig) => {
    updateConfig(data);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500 text-center">Falha ao carregar a configuração.</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Configurações do Jogo</h2>
      <div>
        <label htmlFor="minRange" className="block text-sm font-medium text-gray-700">
          Valor Mínimo
        </label>
        <input
          id="minRange"
          type="number"
          {...register('minRange')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.minRange && <p className="mt-2 text-sm text-red-600">{errors.minRange.message}</p>}
      </div>
      <div>
        <label htmlFor="maxRange" className="block text-sm font-medium text-gray-700">
          Valor Máximo
        </label>
        <input
          id="maxRange"
          type="number"
          {...register('maxRange')}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.maxRange && <p className="mt-2 text-sm text-red-600">{errors.maxRange.message}</p>}
      </div>
      <Button type="submit" disabled={isUpdating} className="w-full">
        {isUpdating ? 'Salvando...' : 'Salvar Configurações'}
      </Button>
    </form>
  );
};
