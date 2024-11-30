import React from 'react';
import LocationCard from '@/molecules/LocationCard';
import DateInfo from '@/molecules/DateInfo';
import Badge from '@/atoms/Badge';

interface EventDetailsProps {
    title: string;
    description: string;
    category: string;
    location: string;
    venueName: string;
    venueAddress: string;
    start: string;
    end: string;
    labels: string[];
}

const EventDetails: React.FC<EventDetailsProps> = ({
    title,
    description,
    category,
    venueName,
    venueAddress,
    start,
    end,
    labels,
}) => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold">{title}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
                <div className="mt-4">
                    <Badge variant="info">{category}</Badge>
                </div>
            </div>
            <LocationCard name={venueName} address={venueAddress} />
            <DateInfo start={start} end={end} />
            <div className="flex flex-wrap gap-2">
                {labels.map((label, index) => (
                    <Badge variant="info" key={index} className="">
                        {label}
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default EventDetails;
