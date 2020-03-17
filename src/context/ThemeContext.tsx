import React, { createContext, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import usePersistent from '../hooks/usePersistent';

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





export const lightTheme = {
    body: '#E2E2E2',
    text: '#363537',
    toggleBorder: '#FFF',
    gradient: 'linear-gradient(#39598A, #79D7ED)',

}

export const darkTheme = {
    body: '#1E1E1E',
    primary: '#0B6DF6',
    text: '#FFF',
    textSecond: '#a0a0a0',
    toggleBorder: '#6B8096',
    gradient: 'linear-gradient(#091236, #1E215D)',
    hover: '#484848',
    popup: '#2f2f2f',
    main: '#232323',
    header: '#2C2C2C',
    divider: '#999999',
    btnHover: '#2e2c31',
    level100: '#383838',
    outline: '#747474'
}
// main: '#1E1E1E'
// body: '#232323',
