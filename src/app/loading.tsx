'use client';

import useScrollReset from "@/hooks/useScrollReset";

const LoadingPage = () => {
    useScrollReset();
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-background to-surface">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-medium text-textPrimary">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;
