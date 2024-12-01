'use client';
import React from 'react';
import EventDetails from '@/organisms/EventDetails';
import Button from '@/atoms/Button';
import Heading from '@/atoms/Text/Heading';

interface EventPageProps {
    event: any;
}

const EventDetailPage: React.FC<EventPageProps> = ({ event }) => {


    if (!event) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Heading size="large" className="text-center text-textPrimary mt-8">
                    Event Details
                </Heading>
                <div className="text-center my-8">
                    <p>Event not found. Please check the event ID or try again later.</p>
                </div>
            </div>
        );
    }

    // Event details rendering
    const { title, category, geo, entities, start, end, labels } = event;

    const venue = entities?.find((e: any) => e.type === 'venue');
    const venueName = venue?.name || 'Venue Name Not Available';
    const venueAddress = venue?.formatted_address || 'Venue Address Not Available';

    // Generate the Google Calendar link
    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${encodeURIComponent(start)}&details=${encodeURIComponent(category)}&location=${encodeURIComponent(geo?.address?.formatted_address)}`;


    return (
        <div className="container mx-auto px-4 py-8">
            <EventDetails
                title={title}
                category={category}
                location={geo?.address?.formatted_address || 'Location Not Available'}
                venueName={venueName}
                venueAddress={venueAddress}
                start={start}
                end={end}
                labels={labels || []}
            />
            <div className="mt-8 text-center">
                <Button
                    variant="primary"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    href={googleCalendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Add to Calendar
                </Button>
            </div>
        </div>
    );
};

export default EventDetailPage;
