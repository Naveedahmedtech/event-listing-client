import React from 'react';
import FilterPanel from '@/molecules/FilterPanel';

interface EventFilterProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    onApplyFilters: () => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ searchQuery, setSearchQuery, onApplyFilters }) => {
    return (
        <div className="mb-8">
            <FilterPanel searchQuery={searchQuery} setSearchQuery={setSearchQuery} onApplyFilters={onApplyFilters} />
        </div>
    );
};

export default EventFilter;
