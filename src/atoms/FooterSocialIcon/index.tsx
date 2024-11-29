'use client';

import Link from 'next/link';
import React from 'react';

interface FooterSocialIconProps {
    href: string;
    icon: React.ReactNode;
    ariaLabel: string;
}

const FooterSocialIcon: React.FC<FooterSocialIconProps> = ({ href, icon, ariaLabel }) => {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="text-textSecondary hover:text-primary transition"
        >
            {icon}
        </Link>
    );
};

export default FooterSocialIcon;
