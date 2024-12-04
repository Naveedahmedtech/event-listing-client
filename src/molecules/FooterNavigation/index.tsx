'use client';

import React from 'react';
import FooterNavLink from '@/atoms/FooterNavLink';

const FooterNavigation: React.FC = () => {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/events', label: 'Events' },
        { href: '/about', label: 'About Us' },
    ];

    return (
        <div className="flex flex-col space-y-2">
            {links.map((link) => (
                <FooterNavLink key={link.href} href={link.href} label={link.label} />
            ))}
        </div>
    );
};

export default FooterNavigation;
