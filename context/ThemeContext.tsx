'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react';
import { STORAGE_KEYS } from '@/data/storage';

export type ThemeName = 'default' | 'viking';

type ThemeContextValue = {
  theme: ThemeName;
  isReady: boolean;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<ThemeName>('default');
  const [isReady, setReady] = useState(false);

  const setTheme = useCallback((nextTheme: ThemeName) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'default' ? 'viking' : 'default'));
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEYS.theme) as ThemeName | null;
    if (storedTheme === 'default' || storedTheme === 'viking') {
      setThemeState(storedTheme);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme, isReady]);

  const value = useMemo(
    () => ({
      theme,
      isReady,
      setTheme,
      toggleTheme
    }),
    [theme, isReady, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
