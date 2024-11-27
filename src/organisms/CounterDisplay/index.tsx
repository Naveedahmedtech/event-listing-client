import React from 'react';
import CounterControls from '@/molecules/CounterControls';

interface CounterDisplayProps {
    count: number;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ count }) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-4">Current Count: {count}</h2>
            <CounterControls />
        </div>
    );
};

export default CounterDisplay;
