import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant: 'info' | 'neutral';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant, className }) => {
    const baseClass =
        'px-3 py-1 rounded-full text-xs font-semibold inline-block';

    const variantClasses = {
        info: 'bg-blue-100 text-blue-800',
        neutral: 'bg-gray-100 text-gray-700',
    };

    return (
        <span className={`${baseClass} ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
