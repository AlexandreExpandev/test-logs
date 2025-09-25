import { api } from '@/core/lib/api';
import { GameConfig } from '../types';

/**
 * @service configService
 * @summary Provides methods for interacting with the game configuration API.
 * @domain config
 */

/**
 * @summary Fetches the current game configuration from the server.
 * @returns {Promise<GameConfig>}
 */
const getGameConfig = async (): Promise<GameConfig> => {
  return api.get('/internal/config/game');
};

/**
 * @summary Updates the game configuration on the server.
 * @param {GameConfig} config The new configuration values.
 * @returns {Promise<GameConfig>} The updated configuration.
 */
const updateGameConfig = async (config: GameConfig): Promise<GameConfig> => {
  return api.put('/internal/config/game', config);
};

export const configService = {
  getGameConfig,
  updateGameConfig,
};
