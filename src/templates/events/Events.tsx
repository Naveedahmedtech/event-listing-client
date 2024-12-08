'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Heading from '@/atoms/Text/Heading';
import EventFilter from '@/organisms/EventFilter';
import EventGrid from '@/organisms/EventsGrid';
import CallToAction from '@/organisms/CallToAction';
import { useGetEventsQuery } from '@/redux/api/predictHQ';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import { locations, predicthqCategories, quickPlatforms as defaultQuickPlatforms } from '@/mock';
import { useAppSelector } from '@/hooks/redux';
import useGeolocation from '@/hooks/useGeolocation';

const Events: React.FC = () => {
    const authState = useAppSelector((state) => state.auth);
    const preferences = useAppSelector((state) => state.preferences);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [selectPlatform, setSelectPlatform] = useState('All');
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: '',
        end: '',
    });

    const { location, loading: geoLoading } = useGeolocation();

    // Add "For You" to quickPlatforms if user is logged in
    const quickPlatforms = useMemo(() => {
        if (authState.isAuthenticated) {
            return ['For You', ...defaultQuickPlatforms];
        }
        return defaultQuickPlatforms;
    }, [authState.isAuthenticated]);

    // Default to "For You" if logged in, else "All"
    useEffect(() => {
        if (authState.isAuthenticated) {
            setSelectPlatform('For You');
        } else {
            setSelectPlatform('All');
        }
    }, [authState.isAuthenticated]);

    // Apply default country code if user is unauthenticated
    useEffect(() => {
        if (!authState.isAuthenticated && location?.countryCode) {
            setSelectedLocation([{ value: location.countryCode, label: location.country }]);
        }
    }, [authState.isAuthenticated, location]);

    // Build query parameters for filtering events
    const buildQueryParams = () => {
        const params: any = {
            limit: 12,
            offset,
        };

        if (selectPlatform === 'For You' && preferences) {
            if (preferences.locations.length > 0) {
                params.country = preferences.locations.join(',');
            }
            if (preferences.categories.length > 0) {
                params.category = preferences.categories.join(',');
            }
            if (preferences.dateRange.startDate && preferences.dateRange.endDate) {
                params['start.gte'] = preferences.dateRange.startDate;
                params['end.lte'] = preferences.dateRange.endDate;
            }
        } else {
            const queries = [];
            if (selectPlatform && selectPlatform !== 'All') {
                queries.push(selectPlatform);
            }
            if (searchQuery) {
                queries.push(searchQuery);
            }
            if (queries.length > 0) {
                params.q = queries.join(' ');
            }

            if (selectedCategory.length > 0) {
                params.category = selectedCategory.map((item: any) => item.value).join(',');
            }

            if (selectedLocation.length > 0) {
                params.country = selectedLocation.map((item: any) => item.value).join(',');
            }

            if (dateRange.start && dateRange.end) {
                params['start.gte'] = dateRange.start;
                params['end.lte'] = dateRange.end;
            }
        }

        return params;
    };

    const { data, isLoading, error: eventsError } = useGetEventsQuery(buildQueryParams());

    const handleApplyFilters = () => {
        setOffset(0);
    };

    const handleStartDateChange = (date: Date | null) => {
        setDateRange((prev) => ({
            ...prev,
            start: date ? date.toISOString().split('T')[0] : '',
        }));
        handleApplyFilters();
    };

    const handleEndDateChange = (date: Date | null) => {
        setDateRange((prev) => ({
            ...prev,
            end: date ? date.toISOString().split('T')[0] : '',
        }));
        handleApplyFilters();
    };

    const events = useMemo(() => {
        return (
            data?.results?.map((event: any) => ({
                id: event.id,
                title: event.title,
                date: event.start,
                location: event.geo?.address?.formatted_address || 'Location not available',
                category: event.category,
                labels: event.labels,
                predictedAttendance: event.phq_attendance,
                venueName:
                    event.entities?.find((e: any) => e.type === 'venue')?.name ||
                    'Location information to be confirmed',
            })) || []
        );
    }, [data]);

    const handlePageChange = (newOffset: number) => {
        setOffset(newOffset);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        handleApplyFilters();
    }, [searchQuery, selectedCategory, selectedLocation, dateRange]);

    if (isLoading || geoLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Heading size="large" className="text-center text-textPrimary mt-8">
                    All Events
                </Heading>
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

            <EventFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                dateRange={dateRange}
                setDateRange={setDateRange}
                onApplyFilters={handleApplyFilters}
                locations={locations}
                categories={predicthqCategories}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                quickPlatforms={quickPlatforms}
                setSelectPlatform={setSelectPlatform}
                selectedPlatform={selectPlatform}
            />

            {events.length === 0 && <p className="text-center mb-8">No events found.</p>}
            {eventsError && <p className="text-center mb-8">Error fetching events</p>}

            {data && events.length > 0 && (
                <>
                    <EventGrid events={events} />
                    {(data.next || data.previous) && (
                        <Pagination
                            currentPage={Math.floor(offset / 12) + 1}
                            totalPages={Math.ceil(data.count / 12)}
                            onPageChange={handlePageChange}
                            next={data.next}
                            previous={data.previous}
                        />
                    )}
                </>
            )}

            {!authState.isAuthenticated && <CallToAction />}
        </div>
    );
};

export default Events;
