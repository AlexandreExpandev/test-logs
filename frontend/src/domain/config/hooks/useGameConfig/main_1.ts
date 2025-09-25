import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { configService } from '../../services';
import { UpdateGameConfigPayload } from '../../types';

export const useGameConfig = () => {
  const queryClient = useQueryClient();

  const {
    data: config,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['gameConfig'],
    queryFn: configService.getGameConfig,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateGameConfigPayload) =>
      configService.updateGameConfig(payload),
    onSuccess: (updatedConfig) => {
      queryClient.setQueryData(['gameConfig'], updatedConfig);
      toast.success('Configuração salva com sucesso!');
    },
    onError: (error) => {
      toast.error(`Falha ao salvar: ${error.message}`);
    },
  });

  return {
    config,
    isLoading,
    error,
    updateConfig: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};
