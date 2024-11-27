'use client';

import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import CounterDisplay from '@/organisms/CounterDisplay';
import ThemeToggle from '@/molecules/ThemeToggle';
import Link from 'next/link';

const CounterTemplate: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-6">Counter Page</h1>
      <CounterDisplay count={count} />
      <div className="mt-8">
        <ThemeToggle />
      </div>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Home
      </Link>
    </div>
  );
};

export default CounterTemplate;
