'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const ConfirmationPage: React.FC = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Adjust the speed dynamically for realism
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) return prev + Math.random() * 10; // Fast initial progress
        if (prev < 70) return prev + Math.random() * 5;  // Slow down midway
        if (prev < 90) return prev + Math.random() * 2;  // Further slow down
        return prev + Math.random(); // Final push to 100
      });
    }, 100);

    // Redirect to home page after the progress reaches 100%
    const timeout = setTimeout(() => {
      router.push('/');
    }, 6000); // 6 seconds total duration

    // Cleanup intervals and timeouts
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 bg-surface rounded-lg shadow space-y-6 text-center">
        <AiOutlineCheckCircle size={64} className="text-primary mx-auto" />
        <h1 className="text-2xl font-bold text-textPrimary">Preferences Saved!</h1>
        <p className="text-textSecondary">
          We are setting up your preferences. Hang tight for a moment!
        </p>
        <div className="relative w-full h-4 bg-border rounded-full overflow-hidden mt-6">
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-textSecondary mt-2">
          {Math.floor(Math.min(progress, 100))}%
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
