'use client';

import { useTheme } from '@/context/ThemeContext';

type ThemeToggleProps = {
  compact?: boolean;
};

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme, isReady } = useTheme();
  const isEntering = theme === 'default';

  const label = isEntering ? 'Enter Viking mode' : 'Return to minimal mode';

  return (
    <button
      type="button"
      className={`theme-toggle ${compact ? 'is-compact' : ''} ${isEntering ? 'is-enter' : 'is-active'}`.trim()}
      onClick={toggleTheme}
      aria-label={label}
      disabled={!isReady}
    >
      <span>{isEntering ? 'Enter Viking Mode' : 'Viking Mode Active'}</span>
    </button>
  );
}
