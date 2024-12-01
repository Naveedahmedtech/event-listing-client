import React from 'react';
import FilterPanel from '@/molecules/FilterPanel';

interface EventFilterProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedCategory: any[]; // Multi-select categories
    setSelectedCategory: (value: any[]) => void; // Setter for selected categories
    selectedLocation: any[]; // Multi-select locations
    setSelectedLocation: (value: any[]) => void; // Setter for selected locations
    dateRange: { start: string; end: string }; // Date range
    setDateRange: (value: { start: string; end: string }) => void; // Setter for date range
    onApplyFilters: () => void;
    handleStartDateChange: (date: Date | null) => void;
    handleEndDateChange: (date: Date | null) => void;
    locations:  { value: string; label: string }[],
    categories:  { value: string; label: string }[],
}

const EventFilter: React.FC<EventFilterProps> = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    dateRange,
    setDateRange,
    onApplyFilters,
    locations,
    categories,
    handleStartDateChange,
    handleEndDateChange
}) => {
    return (
        <div className="mb-8">
            <FilterPanel
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                dateRange={dateRange}
                setDateRange={setDateRange}
                onApplyFilters={onApplyFilters}
                locations={locations}
                categories={categories}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
            />
        </div>
    );
};

export default EventFilter;
