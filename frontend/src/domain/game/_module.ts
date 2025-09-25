/**
 * @module game
 * @summary Manages all game-related functionality including generating numbers,
 * handling user guesses, providing feedback, and managing game state.
 * @domain functional
 * @dependencies ["core/api", "core/components", "zustand"]
 * @version 1.0.0
 * @author Frontend Team
 * @lastModified 2024-07-28
 */

// Domain public exports will be added here as they are created
export * from './components';
export * from './hooks';
export * from './services';
export * from './stores';
export * from './types';

// Module metadata
export const gameModuleMetadata = {
  name: 'game',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['Gameboard', 'GuessForm', 'FeedbackDisplay', 'AttemptsHistory'],
  publicHooks: ['useGame'],
  publicServices: ['gameService'],
  publicStores: ['useGameStore'],
  dependencies: {
    internal: ['core/components/Button', 'core/lib/api'],
    external: ['zustand', 'zod', '@tanstack/react-query', 'react-hot-toast'],
  },
  routes: ['/'],
  description:
    'Core module for the GuessNumber game logic and user interface.',
} as const;

export type GameModuleMetadata = typeof gameModuleMetadata;
