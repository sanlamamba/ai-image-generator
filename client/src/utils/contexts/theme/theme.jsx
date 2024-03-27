import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const enums = {
        'bg': {
            'light': 'bg-white', // Original light mode background
            'dark': 'bg-[#2E3440]' // Nord Polar Night 0, dark mode background
        },
        'text': {
            'light': 'text-black', // Original light mode text
            'dark': 'text-[#ECEFF4]' // Nord Snow Storm 3, dark mode text
        },
        'border': {
            'light': 'border-[#e6ebf4]', // Original light mode border
            'dark': 'border-[#4C566A]' // Nord Polar Night 3, dark mode border
        },
        'bg-secondary': {
            'light': 'bg-[#f9fafe]', // Original light mode secondary background
            'dark': 'bg-[#3B4252]' // Nord Polar Night 1, dark mode secondary background
        },
        'button-primary': {
            'light': 'bg-[#6469ff] text-white', // Original light mode primary button
            'dark': 'bg-[#88C0D0] text-[#2E3440]' // Nord Frost 4, for primary buttons in dark mode
        },
        'button-secondary': {
            'light': 'bg-[#f9fafe] text-black', // Original light mode secondary button
            'dark': 'bg-[#4C566A] text-[#ECEFF4]' // Nord Polar Night 3 for secondary buttons in dark mode
        },
        'link': {
            'light': 'text-blue-500', // Assuming a default light mode link color
            'dark': 'text-[#81A1C1]' // Nord Frost 2, for links in dark mode
        },
        'button-hover': {
            'light': 'bg-[#5a5d99] text-white', // A darker shade for light mode button hover
            'dark': 'bg-[#5E81AC] text-[#ECEFF4]' // Nord Frost 1, for button hover in dark mode
        },
    };
    

    const getTheme = (type) => {
        return enums[type][theme];
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
        }
    }
    , []);


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, getTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
