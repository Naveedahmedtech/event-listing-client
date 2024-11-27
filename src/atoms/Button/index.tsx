'use client';

import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    variant = 'primary',
}) => {
    const baseStyles = `px-5 py-2 rounded-lg font-semibold text-center transition-all duration-300 focus:outline-none focus:ring-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`;

    const variantStyles = {
        primary: `bg-primary text-textPrimary hover:bg-primaryHover focus:ring-primaryHover shadow-sm`,
        secondary: `bg-secondary text-textSecondary hover:bg-secondaryHover focus:ring-secondaryHover shadow-sm`,
        accent: `bg-accent text-textPrimary hover:bg-accentHover focus:ring-accentHover shadow-sm`,
        danger: `bg-error text-textPrimary hover:bg-errorHover focus:ring-errorHover shadow-sm`,
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
