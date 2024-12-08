import React from 'react';
import Button from '@/atoms/Button';

const ActionGroup: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 ">
            <Button className="px-6 py-3" href="/auth/signin" >
                Login
            </Button>
            <Button variant="primary" className="px-6 py-3" href='/auth/registration'>
                Sign Up
            </Button>
        </div>
    );
};

export default ActionGroup;
