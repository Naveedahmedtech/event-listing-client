import React from 'react';
import NavLinksGroup from '@/molecules/NavLinksGroup';
import ActionGroup from '@/molecules/HeaderActionGroup';
import SearchBar from '@/molecules/SearchBar';

interface MobileNavProps {
    isOpen: boolean;
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedCity: any;
    onCityChange: (selectedOption: any) => void;
    cityOptions: { value: string; label: string }[];
}

const MobileNav: React.FC<MobileNavProps> = ({
    isOpen,
    searchQuery,
    onSearchChange,
    selectedCity,
    onCityChange,
    cityOptions,
}) => {
    if (!isOpen) return null;

    return (
        <div className="lg:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-background to-surface z-50 flex flex-col items-center justify-center space-y-8 px-6">
            <NavLinksGroup />
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                selectedCity={selectedCity}
                onCityChange={onCityChange}
                cityOptions={cityOptions}
            />
            <ActionGroup />
        </div>
    );
};

export default MobileNav;
