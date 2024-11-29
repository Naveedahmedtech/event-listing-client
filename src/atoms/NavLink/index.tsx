import React from 'react';
import Link from 'next/link';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    return (
        <Link href={href} className="text-textPrimary hover:text-primary transition">
            {children}
        </Link>
    );
};

export default NavLink;
