import React, { createContext, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import usePersistent from '../hooks/usePersistent';
import { lightTheme, darkTheme } from '../constants/tokens'
type ThemeMode = { theme: { mode: string }; setTheme: React.Dispatch<any>; }

export const ThemeContext = createContext<ThemeMode>(null!);

export const ThemeModeProvider: React.FC = ({ children }) => {
    const { theme, setTheme } = usePersistent()
    let mode = theme.mode === 'light' ? lightTheme : darkTheme;
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ThemeProvider theme={mode}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useThemeValue = () => useContext(ThemeContext);







