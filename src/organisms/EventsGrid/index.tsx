import React from 'react';
import EventCard from '@/molecules/Card/EventCard';

interface EventsGridProps {
    events: {
        id: string;
        title: string;
        date: string;
        location: string;
        category: string;
        labels: string[];
        predictedAttendance?: number;
        venueName: string;
    }[];
}

const EventsGrid: React.FC<EventsGridProps> = ({ events }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    category={event.category}
                    labels={event.labels}
                    predictedAttendance={event.predictedAttendance}
                    venueName={event.venueName}
                    onAddToCalendar={() => console.log(`Added to calendar: ${event.title}`)}
                />
            ))}
        </div>
    );
};

export default EventsGrid;
