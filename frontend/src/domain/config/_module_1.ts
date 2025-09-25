/**
 * @module config
 * @summary Manages game configuration settings, accessible by administrators.
 * @domain config
 * @dependencies ["core/api", "core/components"]
 * @version 1.0.0
 * @author Frontend Team
 * @lastModified 2024-07-28
 */

// Domain public exports
export * from './components';
export * from './hooks';
export * from './services';
export * from './types';

// Module metadata
export const configModuleMetadata = {
  name: 'config',
  domain: 'config',
  version: '1.0.0',
  publicComponents: ['ConfigForm'],
  publicHooks: ['useGameConfig'],
  publicServices: ['configService'],
  publicStores: [],
  dependencies: {
    internal: ['core/components/Button', 'core/lib/api'],
    external: ['zod', '@tanstack/react-query', 'react-hot-toast'],
  },
  routes: ['/admin/config'],
  description:
    'Module for administrators to configure the game number range.',
} as const;

export type ConfigModuleMetadata = typeof configModuleMetadata;
