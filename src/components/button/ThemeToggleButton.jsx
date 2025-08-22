// components/ThemeToggle.tsx
import { FiSun, FiMoon } from 'react-icons/fi';
import { useThemeStore } from '../../stores/themeStore';

export const ThemeToggleButton = () => {
  const { darkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <FiSun className="w-5 h-5 text-yellow-300" />
      ) : (
        <FiMoon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
// This component toggles the theme between light and dark modes using Zustand for state management.