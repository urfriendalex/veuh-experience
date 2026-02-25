'use client';

import { useTheme } from '@/context/ThemeContext';

type ThemeToggleProps = {
  compact?: boolean;
};

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme, isReady } = useTheme();
  const isVikingMode = theme === 'viking';

  const label = isVikingMode ? 'Switch to Clean Mode' : 'Switch to Viking Mode';

  return (
    <button
      type="button"
      className={`theme-toggle ${compact ? 'is-compact' : ''} ${isVikingMode ? 'is-active' : 'is-enter'}`.trim()}
      onClick={toggleTheme}
      aria-label={label}
      disabled={!isReady}
    >
      <span>{isVikingMode ? 'Viking Mode' : 'Clean Mode'}</span>
    </button>
  );
}
