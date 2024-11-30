import React from 'react';

interface DateInfoProps {
    start: string;
    end: string;
}

const DateInfo: React.FC<DateInfoProps> = ({ start, end }) => {
    return (
        <div className="space-y-2">
            <p className="text-text">Start: {new Date(start).toLocaleString()}</p>
            <p className="text-text">End: {new Date(end).toLocaleString()}</p>
        </div>
    );
};

export default DateInfo;
