import { api } from '@/core/lib/api';
import { GameConfig, UpdateGameConfigPayload } from '../types';

/**
 * @service configService
 * @summary Provides methods for interacting with the game configuration API.
 * @domain config
 * @type api-service
 */

/**
 * @summary Retrieves the current game configuration from the server.
 * @returns {Promise<GameConfig>} The current game configuration.
 */
const getGameConfig = async (): Promise<GameConfig> => {
  return api.get('/internal/config/game');
};

/**
 * @summary Updates the game configuration on the server.
 * @param {UpdateGameConfigPayload} payload The new configuration values.
 * @returns {Promise<GameConfig>} The updated game configuration.
 */
const updateGameConfig = async (
  payload: UpdateGameConfigPayload
): Promise<GameConfig> => {
  // Assumes admin role is determined by the JWT token passed by the api instance
  return api.put('/internal/config/game', payload);
};

export const configService = {
  getGameConfig,
  updateGameConfig,
};
