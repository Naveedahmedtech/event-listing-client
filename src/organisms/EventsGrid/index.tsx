import React from 'react';
import EventCard from '@/molecules/Card/EventCard';

interface EventsGridProps {
    events: {
        id: number;
        title: string;
        description: string;
        date: string;
        imageUrl: string;
    }[];
}

const EventsGrid: React.FC<EventsGridProps> = ({ events }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    imageUrl={event.imageUrl}
                    onBuyTickets={() => console.log(`Buy Tickets for ${event.title}`)}
                    onLearnMore={() => console.log(`Learn More about ${event.title}`)}
                />
            ))}
        </div>
    );
};

export default EventsGrid;
