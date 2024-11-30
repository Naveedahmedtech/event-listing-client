'use client';

import React from 'react';
import Link from 'next/link';

interface NavLinksGroupProps {
    closeMenu: () => void;
}

const NavLinksGroup: React.FC<NavLinksGroupProps> = ({ closeMenu }) => {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/events', label: 'Events' },
        { href: '/about', label: 'About Us' },
    ];

    const handleLinkClick = () => {
        closeMenu(); 
    };

    return (
        <nav className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-12">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-textPrimary hover:text-primary transition"
                    onClick={handleLinkClick}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
};

export default NavLinksGroup;
