'use client';
import React, { useState, useMemo } from 'react';
import Heading from '@/atoms/Text/Heading';
// import EventFilter from '@/organisms/EventFilter';
import EventGrid from '@/organisms/EventsGrid';
import CallToAction from '@/organisms/CallToAction';
import { useGetEventsQuery } from '@/redux/api/predictHQ';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';  // Import the Pagination component

const Events: React.FC = () => {
    const [searchQuery,] = useState('');
    const [offset, setOffset] = useState(0); // Offset for pagination

    const { data, isLoading, error: eventsError } = useGetEventsQuery({
        limit: 12, // The number of events per page
        query: searchQuery,
        offset, // Use offset instead of page
    });

    // const handleApplyFilters = () => {
    //     // Reset to first page (offset = 0) when applying filters
    //     setOffset(0);
    // };

    // Transforming the event data for rendering
    const events = useMemo(() => {
        return data?.results?.map((event: any) => ({
            id: event.id,
            title: event.title,
            date: event.start,
            location: event.geo?.address?.formatted_address || 'Location not available',
            category: event.category,
            labels: event.labels,
            predictedAttendance: event.phq_attendance,
            venueName: event.entities?.find((e: any) => e.type === 'venue')?.name || 'Location information to be confirmed',
        })) || [];
    }, [data]);

    const handlePageChange = (newOffset: number) => {
        setOffset(newOffset);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Heading size="large" className="text-center text-textPrimary mt-8">All Events</Heading>
                <div className="text-center my-8">
                    <Loading />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Heading size="large" className="text-center text-textPrimary my-8">
                All Events
            </Heading>
            {!isLoading && !eventsError && data && events.length === 0 && (
                <p className="text-center mb-8">No events found.</p>
            )}
            {eventsError && <p className="text-center mb-8">Error fetching events</p>}
            {data && events.length > 0 && (
                <>
                    {/* <EventFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} onApplyFilters={handleApplyFilters} /> */}
                    <EventGrid events={events} />
                    {/* Conditionally render Pagination if the 'next' or 'previous' fields are present */}
                    {(data.next || data.previous) && (
                        <Pagination
                            currentPage={offset / 12 + 1}  // Calculate the current page number
                            totalPages={Math.ceil(data.count / 12)}  // Total pages calculation based on count and limit
                            onPageChange={handlePageChange}
                            next={data.next}  // Pass the next URL to handle next page
                            previous={data.previous}  // Pass the previous URL to handle previous page
                        />
                    )}
                </>
            )}
            <CallToAction />
        </div>
    );
};

export default Events;
