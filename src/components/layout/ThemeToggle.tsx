import React from 'react';
import { Moon, Sun } from 'lucide-react';

export interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: (value: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(!darkMode)}
      className="absolute top-4 right-4 p-2.5 rounded-full liquid-glass text-gray-800 dark:text-white transition-transform hover:scale-110 z-50"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
