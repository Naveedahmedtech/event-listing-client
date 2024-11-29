'use client';

import { FaExclamationTriangle } from 'react-icons/fa'; 
import Link from 'next/link';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-background to-surface">
            <div className="text-center">
                <FaExclamationTriangle className="w-20 h-20 mx-auto text-error" />
                <h1 className="mt-6 text-4xl font-extrabold text-textPrimary">Oops!</h1>
                <p className="mt-4 text-lg text-textSecondary">
                    Something went wrong. Please try again later.
                </p>
                <div className="mt-8">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-primary rounded-full hover:bg-primaryHover focus:outline-none focus:ring focus:ring-primaryHover"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;
