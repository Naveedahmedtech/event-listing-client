'use client';
import React, { useEffect } from 'react';
import EventDetails from '@/organisms/EventDetails';
import Button from '@/atoms/Button';
import Heading from '@/atoms/Text/Heading';

interface EventPageProps {
    event: any;
}

const EventDetailPage: React.FC<EventPageProps> = ({ event }) => {
    // Fetch the event data using the event ID
    // const { data: event, error, isLoading } = useGetEventQuery(eventId);

    useEffect(() => {
        if (event) {
            console.log('Event Data:', event);
        }
    }, [event]);

    // // Loading state handling
    // if (isLoading) {
    //     return (
    //         <div className="container mx-auto px-4 py-8">
    //             <Heading size="large" className="text-center text-textPrimary mt-8">
    //                 Event Details
    //             </Heading>
    //             <div className="text-center my-8">
    //                 <Loading />
    //             </div>
    //         </div>
    //     );
    // }

    // // Error state handling
    // if (error) {
    //     return (
    //         <div className="container mx-auto px-4 py-8">
    //             <Heading size="large" className="text-center text-textPrimary mt-8">
    //                 Event Details
    //             </Heading>
    //             <div className="text-center my-8">
    //                 <p>Error fetching event data. Please try again later.</p>
    //             </div>
    //         </div>
    //     );
    // }

    // Handling if event is not found
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
    const { title, description, category, geo, entities, start, end, labels } = event;

    const venue = entities?.find((e: any) => e.type === 'venue');
    const venueName = venue?.name || 'Venue Name Not Available';
    const venueAddress = venue?.formatted_address || 'Venue Address Not Available';

    return (
        <div className="container mx-auto px-4 py-8">
            <EventDetails
                title={title}
                description={description}
                category={category}
                location={geo?.address?.formatted_address || 'Location Not Available'}
                venueName={venueName}
                venueAddress={venueAddress}
                start={start}
                end={end}
                labels={labels || []}
            />
            <div className="mt-8 text-center">
                <Button onClick={() => console.log('Added to calendar')}>Add to Calendar</Button>
            </div>
        </div>
    );
};

export default EventDetailPage;
