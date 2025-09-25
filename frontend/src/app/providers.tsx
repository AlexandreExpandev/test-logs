import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/core/contexts/auth';
import { ThemeProvider } from '@/core/contexts/theme';
import { AppRouter } from './router';

/**
 * @provider AppProviders
 * @summary Centralized configuration of all application context providers.
 * @type provider-configuration
 * @category setup
 *
 * @providers
 * - QueryClientProvider: Server state management
 * - HelmetProvider: Document head management
 * - AuthProvider: Authentication context
 * - ThemeProvider: Theme context
 * - Toaster: Toast notifications
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviders = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <AppRouter />
            <Toaster position="top-right" />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};
