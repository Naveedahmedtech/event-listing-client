import MultiSelect from '@/atoms/form/MultiSelect';
import SearchInput from '@/atoms/form/SearchInput';
import Tabs from '@/atoms/Tabs';
import React from 'react';
import ReactDatePicker from 'react-datepicker';

interface FilterPanelProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedCategory: any[];
    setSelectedCategory: (value: any[]) => void;
    selectedLocation: any[];
    setSelectedLocation: (value: any[]) => void;
    dateRange: { start: string; end: string };
    setDateRange: (value: { start: string; end: string }) => void;
    onApplyFilters: () => void;
    setSelectPlatform: (platform:string) => void;
    locations: { value: string; label: string }[];
    categories: { value: string; label: string }[];
    handleStartDateChange: (date: Date | null) => void;
    handleEndDateChange: (date: Date | null) => void;
    quickPlatforms: string[];
    selectedPlatform: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    dateRange,
    handleStartDateChange,
    handleEndDateChange,
    onApplyFilters,
    locations,
    categories,
    quickPlatforms,
    setSelectPlatform,
    selectedPlatform
}) => {
    const handleCategoryChange = (selectedOptions: any) => {
        setSelectedCategory(selectedOptions);
        onApplyFilters();
    };

    const handleLocationChange = (selectedOptions: any) => {
        setSelectedLocation(selectedOptions);
        onApplyFilters();
    };

    const handlePlatformSelect = (platform: string) => {
        setSelectPlatform(platform);
        onApplyFilters(); // Apply filters when platform changes
      };
    

    return (
        <div className="mb-8 space-y-6">
            {/* Search Input */}
            <div className="mb-4 w-full max-w-lg mx-auto">
                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                />
            </div>

            {/* Platform Tabs */}
            <div className="space-y-2">
                {/* <h4 className="text-xl font-semibold mb-2 text-textPrimary">Related Platforms</h4> */}
                <Tabs
                    options={quickPlatforms}
                    selectedOption={selectedPlatform}
                    onSelect={handlePlatformSelect} 
                />
            </div>

            {/* Category & Location Filters in One Row */}
            <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex-1 min-w-[250px]">
                    <h4 className="text-lg font-semibold mb-2 text-textPrimary">Categories</h4>
                    <MultiSelect
                        options={categories}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        placeholder="Select categories"
                    />
                </div>

                <div className="flex-1 min-w-[250px]">
                    <h4 className="text-lg font-semibold mb-2 text-textPrimary">Location</h4>
                    <MultiSelect
                        options={locations}
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        placeholder="Select locations"
                    />
                </div>
            </div>

            {/* Date Range Inputs */}
            <div className="flex gap-6">
                <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">Start Date</h4>
                    <ReactDatePicker
                        showIcon
                        selected={dateRange.start ? new Date(dateRange.start) : null}
                        onChange={handleStartDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-3 py-2 border rounded-md bg-surface text-text"
                        calendarClassName="custom-calendar"
                    />
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">End Date</h4>
                    <ReactDatePicker
                        showIcon
                        selected={dateRange.end ? new Date(dateRange.end) : null}
                        onChange={handleEndDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-3 py-2 border rounded-md bg-surface text-text"
                        calendarClassName="custom-calendar"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
