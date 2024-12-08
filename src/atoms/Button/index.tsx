import Link from 'next/link';
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'danger';
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    variant = 'primary',
    href,
    target = '_self',
    rel,
}) => {
    const baseStyles = `px-5 py-2 rounded-lg font-semibold text-center transition-all duration-300 focus:outline-none focus:ring-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    const variantStyles = {
        primary: `bg-primary text-white hover:bg-primaryHover focus:ring-primaryHover shadow-sm`,
        secondary: `bg-secondary text-white hover:bg-secondaryHover focus:ring-secondaryHover shadow-sm`,
        accent: `bg-accent text-white hover:bg-accentHover focus:ring-accentHover shadow-sm`,
        danger: `bg-error text-white hover:bg-errorHover focus:ring-errorHover shadow-sm`,
    };

    if (href) {
        return (
            <Link
                href={href}
                target={target}
                rel={rel}
                className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            >
                {children}
            </Link>
        );
    }

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
