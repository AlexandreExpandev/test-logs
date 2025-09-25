import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { configService } from '../../services';
import { GameConfig } from '../../types';

const CONFIG_QUERY_KEY = ['gameConfig'];

/**
 * @hook useGameConfig
 * @summary Fetches the current game configuration.
 * @domain config
 */
export const useGameConfig = () => {
  return useQuery<GameConfig>({ // Specify the type for useQuery
    queryKey: CONFIG_QUERY_KEY,
    queryFn: configService.getGameConfig,
  });
};

/**
 * @hook useUpdateGameConfig
 * @summary Provides a mutation function to update the game configuration.
 * @domain config
 */
export const useUpdateGameConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: GameConfig) => configService.updateGameConfig(config),
    onSuccess: (updatedConfig) => {
      queryClient.setQueryData(CONFIG_QUERY_KEY, updatedConfig);
      toast.success('Configuração do jogo atualizada com sucesso!');
    },
    onError: (error: { message: string }) => {
      toast.error(`Falha ao atualizar a configuração: ${error.message}`);
    },
  });
};
