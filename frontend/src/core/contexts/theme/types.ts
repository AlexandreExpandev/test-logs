import { ReactNode } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
