"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = exports.ThemeProvider = void 0;
const react_1 = __importStar(require("react"));
const preferences_1 = require("@capacitor/preferences");
const ThemeContext = (0, react_1.createContext)(undefined);
const ThemeProvider = ({ children, checkMatchMediaSupport = false }) => {
    const [isDarkMode, setIsDarkMode] = (0, react_1.useState)(false);
    const loadDarkModePreference = async (checkMatchMedia) => {
        try {
            const { value } = await preferences_1.Preferences.get({ key: 'darkMode' });
            // Check if the browser supports window.matchMedia and if the user prefers a dark color scheme.
            if (checkMatchMedia) {
                const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const themePreference = value === null ? systemPrefersDark : value === 'true';
                setIsDarkMode(themePreference);
                if (themePreference) {
                    document.body.classList.add('dark');
                }
                else {
                    document.body.classList.remove('dark');
                }
            }
            else if (value !== undefined && value !== null) {
                setIsDarkMode(value === 'true');
            }
        }
        catch (error) {
            console.error('Error loading dark mode preference: ', error);
        }
    };
    (0, react_1.useEffect)(() => {
        loadDarkModePreference(checkMatchMediaSupport);
    }, [checkMatchMediaSupport]);
    const toggleDarkMode = async () => {
        try {
            const newDarkModeState = !isDarkMode;
            setIsDarkMode(newDarkModeState);
            await preferences_1.Preferences.set({ key: 'darkMode', value: newDarkModeState.toString() });
        }
        catch (error) {
            console.error('Error saving dark mode preference: ', error);
        }
    };
    (0, react_1.useEffect)(() => {
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);
    return (react_1.default.createElement(ThemeContext.Provider, { value: { isDarkMode, toggleDarkMode } }, children));
};
exports.ThemeProvider = ThemeProvider;
const useTheme = () => {
    const context = (0, react_1.useContext)(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
exports.useTheme = useTheme;
