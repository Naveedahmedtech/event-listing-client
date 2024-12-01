'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Heading from '@/atoms/Text/Heading';
import EventFilter from '@/organisms/EventFilter';
import EventGrid from '@/organisms/EventsGrid';
import CallToAction from '@/organisms/CallToAction';
import { useGetEventsQuery } from '@/redux/api/predictHQ';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';  // Import Pagination component
import { locations, categories } from "@/mock"

const Events: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<any[]>([]); // Multi-select categories
    const [selectedLocation, setSelectedLocation] = useState<any[]>([]); // Multi-select locations
    const [offset, setOffset] = useState(0); // Pagination offset
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: '',
        end: '',
    });

    let params: any;
    // Build query parameters for filtering events
    const buildQueryParams = () => {
        params = {
            limit: 12, // Set default limit
            offset,
            query: searchQuery, // Use search query for filtering events by title
        };

        // Add categories filter if selected
        if (selectedCategory.length > 0) {
            params.category = selectedCategory.map((item: any) => item.value).join(',');
        }

        // Add locations filter if selected
        if (selectedLocation.length > 0) {
            params.country = selectedLocation.map((item: any) => item.value).join(',');
        }

        // Add date range filter if selected
        if (dateRange.start && dateRange.end) {
            params['start.gte'] = dateRange.start;
            params['end.lte'] = dateRange.end;
        }

        return params;
    };

    // Fetch event data from the API with the applied filters
    const { data, isLoading, error: eventsError } = useGetEventsQuery(buildQueryParams());

    const handleApplyFilters = () => {
        // Reset to the first page when applying filters
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

    // Transform event data to display
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

    // Handle page change for pagination
    const handlePageChange = (newOffset: number) => {
        setOffset(newOffset);  // Update the offset based on the selected page
    };

    // Apply filters when the search query or selected filters change
    useEffect(() => {
        handleApplyFilters();
    }, [searchQuery, selectedCategory, selectedLocation, dateRange]);

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
                    {/* Event Filter */}
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
                        categories={categories}
                        handleStartDateChange={handleStartDateChange}
                        handleEndDateChange={handleEndDateChange}
                    />
                    <EventGrid events={events} />

                    {/* Pagination */}
                    {(data.next || data.previous) && (
                        <Pagination
                            currentPage={Math.floor(offset / 12) + 1}  // Calculate the current page number
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
