import React from 'react';
import SearchInput from '@/atoms/form/SearchInput';
import CitySelector from '@/atoms/form/CitySelector';

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedCity: any;
    onCityChange: (selectedOption: any) => void;
    cityOptions: { value: string; label: string }[];
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchQuery,
    onSearchChange,
    selectedCity,
    onCityChange,
    cityOptions,
}) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 w-full max-w-xl px-4 sm:px-0 lg:px-6">
            {/* Search Input */}
            <SearchInput
                value={searchQuery}
                onChange={onSearchChange}
                className="flex-1 w-full"
            />
            {/* City Selector */}
            <CitySelector
                options={cityOptions}
                value={selectedCity}
                onChange={onCityChange}
                className="flex-1 w-full lg:w-auto"
            />
        </div>
    );
};

export default SearchBar;
