'use client';

import React from 'react';
import Link from 'next/link';

interface FooterNavLinkProps {
    href: string;
    label: string;
}

const FooterNavLink: React.FC<FooterNavLinkProps> = ({ href, label }) => {
    return (
        <Link href={href} className="text-sm text-textSecondary hover:text-primary transition">
            {label}
        </Link>
    );
};

export default FooterNavLink;
