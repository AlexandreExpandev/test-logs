/**
 * @file Defines the core types for the game configuration domain.
 */

/**
 * @interface GameConfig
 * @summary Represents the game's number range configuration.
 */
export interface GameConfig {
  minRange: number;
  maxRange: number;
}

/**
 * @interface UpdateGameConfigPayload
 * @summary The payload required to update the game configuration.
 */
export type UpdateGameConfigPayload = GameConfig;
