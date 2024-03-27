import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/contexts/theme/theme';

function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const themeIcon = theme === 'light' ? '🌞' : '🌜';
    const renderThemeChanger = () => {
        return themeIcon;
    };

    return (
        <button onClick={toggleTheme} className={`px-4 py-2 rounded-lg text-sm font-medium ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-700 text-white'}`} aria-label="Toggle theme">
            {renderThemeChanger()}
        </button>
    );
}

export default ThemeToggle;
