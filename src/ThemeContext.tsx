import React, { createContext, useContext, useEffect, useState } from 'react';
import { Preferences } from '@capacitor/preferences';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  checkMatchMediaSupport?: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, checkMatchMediaSupport = false }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const loadDarkModePreference = async (checkMatchMedia: boolean) => {
    try {
      const { value } = await Preferences.get({ key: 'darkMode' });
      // Check if the browser supports window.matchMedia and if the user prefers a dark color scheme.
      if (checkMatchMedia) {
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const themePreference = value === null ? systemPrefersDark : value === 'true';
        setIsDarkMode(themePreference);
        if (themePreference) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
      } else if (value !== undefined && value !== null) {
        setIsDarkMode(value === 'true');
      }
    } catch (error) {
      console.error('Error loading dark mode preference: ', error);
    }
  };

  useEffect(() => {
    loadDarkModePreference(checkMatchMediaSupport);
  }, [checkMatchMediaSupport]);

  const toggleDarkMode = async () => {
    try {
      const newDarkModeState = !isDarkMode;
      setIsDarkMode(newDarkModeState);
      await Preferences.set({ key: 'darkMode', value: newDarkModeState.toString() })
    } catch (error) {
      console.error('Error saving dark mode preference: ', error);
    }
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}