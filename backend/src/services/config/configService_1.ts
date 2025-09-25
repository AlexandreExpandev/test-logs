import { GameConfig, UpdateGameConfigPayload } from './types';

/**
 * @summary
 * In-memory store for game configuration.
 * In a real application, this would be stored in a database or a config file.
 */
let gameConfig: GameConfig = {
  minRange: 1,
  maxRange: 100,
};

/**
 * @summary
 * Retrieves the current game configuration.
 * 
 * @function getGameConfig
 * @module Config
 * 
 * @returns {GameConfig} The current game configuration.
 */
export const getGameConfig = (): GameConfig => {
  return gameConfig;
};

/**
 * @summary
 * Updates the game configuration.
 * 
 * @function updateGameConfig
 * @module Config
 * 
 * @param {UpdateGameConfigPayload} newConfig - The new configuration values.
 * 
 * @returns {GameConfig} The updated game configuration.
 */
export const updateGameConfig = (newConfig: UpdateGameConfigPayload): GameConfig => {
  // The validation is handled by Zod in the controller, but a service-level check is good practice.
  if (newConfig.minRange >= newConfig.maxRange) {
    throw new Error('minRange must be strictly less than maxRange.');
  }

  gameConfig = {
    minRange: newConfig.minRange,
    maxRange: newConfig.maxRange,
  };

  return gameConfig;
};
