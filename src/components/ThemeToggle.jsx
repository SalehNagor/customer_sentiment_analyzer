import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Icon from './AppIcon';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Icon name="Moon" size={20} color="var(--color-foreground)" />
      ) : (
        <Icon name="Sun" size={20} color="var(--color-foreground)" />
      )}
    </button>
  );
};

export default ThemeToggle;