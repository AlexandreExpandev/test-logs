/**
 * @module config
 * @summary Manages game configuration settings, such as the number range.
 * @domain config
 * @dependencies ["core/api"]
 * @version 1.0.0
 * @author Frontend Team
 * @lastModified 2024-07-28
 */

export * from './components';
export * from './hooks';
export * from './services';
export * from './types';

export const configModuleMetadata = {
  name: 'config',
  domain: 'config',
  version: '1.0.0',
  publicComponents: ['ConfigForm'],
  publicHooks: ['useGameConfig', 'useUpdateGameConfig'],
  publicServices: ['configService'],
  dependencies: {
    internal: ['core/lib/api', 'core/components/Button', 'core/components/LoadingSpinner'],
    external: ['@tanstack/react-query', 'react-hook-form', 'zod', 'react-hot-toast'],
  },
  routes: ['/admin/settings'],
  description: 'Module for managing administrative game settings.',
} as const;

export type ConfigModuleMetadata = typeof configModuleMetadata;
