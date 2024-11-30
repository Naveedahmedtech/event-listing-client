'use client';

import React, { useState } from 'react';
import Logo from '@/atoms/Logo';
import NavLinksGroup from '@/molecules/NavLinksGroup';
import ActionGroup from '@/molecules/HeaderActionGroup';
import MenuToggle from '@/atoms/Button/MenuToggle';
import SearchBar from '@/molecules/SearchBar';
import MobileNav from '@/molecules/MobileNav';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);

    const cityOptions = [
        { value: 'new-york', label: 'New York' },
        { value: 'los-angeles', label: 'Los Angeles' },
        { value: 'chicago', label: 'Chicago' },
        { value: 'houston', label: 'Houston' },
        { value: 'miami', label: 'Miami' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-background bg-opacity-80 backdrop-blur-md shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-8 py-6">
                {/* Logo */}
                <Logo />

                {/* Search Bar - Visible only on desktop */}
                <div className="hidden lg:block">
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchChange={(e) => setSearchQuery(e.target.value)}
                        selectedCity={selectedCity}
                        onCityChange={setSelectedCity}
                        cityOptions={cityOptions}
                    />
                </div>

                {/* Menu Toggle */}
                <MenuToggle isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-12">
                    <NavLinksGroup  closeMenu={() => setIsMenuOpen(false)} />
                    <ActionGroup />
                </nav>
            </div>

            {/* Mobile Navigation - Includes SearchBar */}
            <MobileNav
                isOpen={isMenuOpen}
                searchQuery={searchQuery}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
                cityOptions={cityOptions}
                closeMenu={() => setIsMenuOpen(false)}
            />
        </header>
    );
};

export default Header;
