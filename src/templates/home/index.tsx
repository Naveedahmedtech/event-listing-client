'use client';
import React, { useMemo } from 'react';
import HeroSection from '@/organisms/HeroSection';
import Heading from '@/atoms/Text/Heading';
import EventsGrid from '@/organisms/EventsGrid';
import CallToAction from '@/organisms/CallToAction';
import { useGetEventsQuery } from '@/redux/api/predictHQ';
import useGeolocation from '@/hooks/useGeolocation';
import Loading from '@/components/Loading';

const HomePage: React.FC = () => {
    const { location, loading: locationLoading, permissionDenied, retryPermission } = useGeolocation();

    const radius = 5;
    const unit = 'km';


    // Use default location if permission is denied or location is unavailable
    const within = (location)
        ? `${radius}${unit}@${(location).latitude},${(location).longitude}`
        : undefined;

    // Fetch events, pass `within` only if location is available or fallback location is set
    const { data, error: eventsError, isLoading } = useGetEventsQuery({
        limit: 6,
        country: (location?.countryCode) || 'pk',
        ...(location ? { within } : {}),
    });


    const isLocationLoading = locationLoading || isLoading;

    // Process event data
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

    if (isLocationLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <HeroSection />
                <Heading size="large" className="text-center text-textPrimary mt-8">Upcoming Events</Heading>
                <div className="text-center my-8">
                    <Loading />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <HeroSection />
            <Heading size="large" className="text-center text-textPrimary mt-8">
                Upcoming Events
            </Heading>

            {!isLocationLoading && !eventsError && data && events.length === 0 && (
                <p className="text-center mb-8">No events found.</p>
            )}

            {eventsError && <p className="text-center mb-8">Error fetching events</p>}

            {data && events.length > 0 && (
                <>
                    {/* Show location message if available */}
                    
                    <p className="text-center mb-8">
                        Showing events near: {(location?.city && location?.city ) || 'Unknown City'}, {(location?.country) || 'Unknown Country'}
                    </p>
                    <EventsGrid events={events} />
                </>
            )}

            {/* Retry location access if denied */}
            {permissionDenied && (
                <div className="text-center mt-8">
                    <button
                        onClick={retryPermission}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Retry Location Access
                    </button>
                </div>
            )}

            <CallToAction />
        </div>
    );
};

export default HomePage;
