import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <svg
                className="animate-spin h-12 w-12 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2z"
                ></path>
            </svg>
        </div>
    );
};

export default Loading;
