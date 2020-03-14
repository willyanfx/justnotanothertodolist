import React, { createContext, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import usePersistent from '../hooks/usePersistent';

type ThemeMode = { theme: { mode: string }; setTheme: React.Dispatch<any>; }

export const ThemeContext = createContext<ThemeMode>(null!);

export const ThemeModeProvider: React.FC = ({ children }) => {
    const { theme, setTheme } = usePersistent()
    console.log(theme)
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





export const lightTheme = {
    body: '#E2E2E2',
    text: '#363537',
    toggleBorder: '#FFF',
    gradient: 'linear-gradient(#39598A, #79D7ED)',
}

export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    gradient: 'linear-gradient(#091236, #1E215D)',
}
