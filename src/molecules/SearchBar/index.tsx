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
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 w-full max-w-xl lg:px-6">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
            <CitySelector options={cityOptions} value={selectedCity} onChange={onCityChange} />
        </div>
    );
};

export default SearchBar;
