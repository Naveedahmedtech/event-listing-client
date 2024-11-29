import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
    return (
        <Link href="/" className="text-4xl font-extrabold text-primary tracking-wider z-[10000]">
            MyBrand
        </Link>
    );
};

export default Logo;
