import React from 'react';
import InputField from '@/atoms/form/InputField';
import Button from '@/atoms/Button';

interface FilterPanelProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    onApplyFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ searchQuery, setSearchQuery, onApplyFilters }) => {
    return (
        <div className="bg-white p-6 shadow-md rounded-lg">
            <InputField
                label="Search Events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location, or category"
            />
            <Button onClick={onApplyFilters} className="mt-4 bg-blue-600 text-white">
                Apply Filters
            </Button>
        </div>
    );
};

export default FilterPanel;
