import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

export type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const defaultValue: ThemeContextType = {
    darkMode: false,
    toggleDarkMode: ()=>{}
}

export const ThemeContext = createContext<ThemeContextType >(defaultValue);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        let theme = localStorage.getItem("theme")
        if (theme === 'light'){
            setDarkMode(false)
        }else{
            setDarkMode(true)
        }
    }, []);

    const toggleDarkMode = () => {
        localStorage.setItem("theme", darkMode ? "light" : "dark");
        setDarkMode(prevMode => !prevMode);
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("Context is undefined ")
    }
    return context;
}