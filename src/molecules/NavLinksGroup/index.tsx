import React from 'react';
import Link from 'next/link';

const NavLinksGroup: React.FC = () => {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/events', label: 'Events' },
        { href: '/about', label: 'About Us' },
    ];

    return (
        <nav className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-12">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-textPrimary hover:text-primary transition"
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
};

export default NavLinksGroup;
