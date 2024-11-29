import React from 'react';
import EventImage from '@/atoms/EventImage';
import Heading from '@/atoms/Text/Heading';
import Button from '@/atoms/Button';

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    onBuyTickets: () => void;
    onLearnMore: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
    title,
    description,
    date,
    imageUrl,
    onBuyTickets,
    onLearnMore,
}) => {
    return (
        <div className="bg-surface p-4 rounded-lg shadow-md">
            <EventImage src={imageUrl} alt={title} />
            <div className="mt-4">
                <Heading size="medium" className="text-textPrimary">
                    {title}
                </Heading>
                <p className="text-sm text-textSecondary mt-2">{description}</p>
                <p className="text-sm text-textPrimary mt-1 font-medium">{date}</p>
                <div className="flex space-x-4 mt-4">
                    <Button onClick={onBuyTickets} variant="primary">
                        Buy Tickets
                    </Button>
                    <Button onClick={onLearnMore} variant="secondary">
                        Learn More
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
