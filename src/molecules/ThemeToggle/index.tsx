import React from 'react';
import Button from '@/atoms/Button';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme}>
            Toggle Theme: {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
    );
};

export default ThemeToggle;
