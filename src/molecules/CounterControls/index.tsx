import React from 'react';
import Button from '@/atoms/Button';
import { useAppDispatch } from '@/hooks/redux';
import { decrement, increment, incrementByAmount } from '@/redux/slices/counterSlice';

const CounterControls: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="flex space-x-4">
            <Button
                onClick={() => dispatch(increment())}
            >
                Increment
            </Button>
            
            <Button
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </Button>
            <Button
                onClick={() => dispatch(incrementByAmount(5))}
            >
                Increment by 5
            </Button>
        </div>
    );
};

export default CounterControls;
