import { useState, useEffect } from 'react';


export default function usePersistent(defaultTheme = { mode: 'light' }) {

    const [theme, setTheme] = useState(() => {
        const storageValue = localStorage.getItem('boring-theme');
        if (storageValue) {
            return JSON.parse(storageValue);
        } else {
            return defaultTheme;
        }
    });


    useEffect(() => {
        localStorage.setItem('boring-theme', JSON.stringify(theme));
    }, [theme]);

    return { theme, setTheme };

}