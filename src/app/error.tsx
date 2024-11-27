'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-bg-background to-gray-300">
            <div className="text-center">
                <ExclamationTriangleIcon className="w-20 h-20 mx-auto text-yellow-500" />
                <h1 className="mt-6 text-4xl font-extrabold text-gray-800">Oops!</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Something went wrong. Please try again later.
                </p>
                <div className="mt-8">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;
