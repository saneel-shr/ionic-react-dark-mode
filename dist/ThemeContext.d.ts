import React from 'react';
interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}
interface ThemeProviderProps {
    children: React.ReactNode;
    checkMatchMediaSupport?: boolean;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => ThemeContextType;
export {};
