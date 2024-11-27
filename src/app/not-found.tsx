import { ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <ExclamationCircleIcon className="w-20 h-20 mx-auto text-red-500" />
      <h1 className="mt-6 text-7xl font-extrabold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, the page you’re looking for can’t be found.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        The link might be broken, or the page may have been removed.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
