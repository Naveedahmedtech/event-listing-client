'use client';

import { FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-background to-surface">
      <FaExclamationCircle className="w-20 h-20 mx-auto text-error" />
      <h1 className="mt-6 text-7xl font-extrabold text-textPrimary">404</h1>
      <p className="mt-4 text-lg text-textSecondary">
        Sorry, the page you’re looking for can’t be found.
      </p>
      <p className="mt-2 text-sm text-textSecondary">
        The link might be broken, or the page may have been removed.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-primary rounded-full hover:bg-primaryHover focus:outline-none focus:ring focus:ring-primaryHover"
        >
          <FaArrowLeft className="w-5 h-5" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
