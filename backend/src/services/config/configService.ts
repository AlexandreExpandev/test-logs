import { GameConfig, UpdateGameConfigPayload } from './types';
import { logger } from '@/utils/logger';

// In-memory store for game configuration.
// In a real application, this would be persisted in a database.
let currentConfig: GameConfig = {
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
export function getGameConfig(): GameConfig {
  // In a real app with a DB, this might involve a cache check.
  return currentConfig;
}

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
 * @throws {Error} If the validation fails (min >= max).
 */
export function updateGameConfig(newConfig: UpdateGameConfigPayload): GameConfig {
  const { minRange, maxRange } = newConfig;

  // Validation from VA-004
  if (minRange >= maxRange) {
    throw new Error('Intervalo inválido: O valor mínimo deve ser menor que o valor máximo.');
  }

  currentConfig = { minRange, maxRange };
  logger.info('Game configuration updated', { newConfig: currentConfig });

  return currentConfig;
}
