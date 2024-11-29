import React from 'react';

interface HeadingProps {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, size = 'medium', className }) => {
    const sizes = {
        small: 'text-lg font-medium',
        medium: 'text-2xl font-semibold',
        large: 'text-4xl font-bold',
    };

    return <h2 className={`${sizes[size]} ${className}`}>{children}</h2>;
};

export default Heading;
