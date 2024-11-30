import React from 'react';

interface LocationCardProps {
    name: string;
    address: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ name, address }) => {
    return (
        <div className="bg-surface p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p>{address}</p>
        </div>
    );
};

export default LocationCard;
