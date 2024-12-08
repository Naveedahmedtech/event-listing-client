"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/atoms/Logo";
import NavLinksGroup from "@/molecules/NavLinksGroup";
import ActionGroup from "@/molecules/HeaderActionGroup";
import MenuToggle from "@/atoms/Button/MenuToggle";
import MobileNav from "@/molecules/MobileNav";
import ProfileDropdown from "@/components/ProfileDropdown";
import { useFetchUserWithDetailsQuery } from "@/redux/api/user";
import { useLogoutMutation } from "@/redux/api/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setPreferences } from "@/redux/slices/preferencesSlice";
import { setCredentials, clearCredentials } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { ENV } from "@/constants";

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState(null);

    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const router = useRouter();

    const cityOptions = [
        { value: "new-york", label: "New York" },
        { value: "los-angeles", label: "Los Angeles" },
        { value: "chicago", label: "Chicago" },
        { value: "houston", label: "Houston" },
        { value: "miami", label: "Miami" },
    ];

    // Fetch user details
    const { data: userDetails, isLoading, refetch } = useFetchUserWithDetailsQuery({}, { skip: !!authState.isAuthenticated });
    console.log("ENV", ENV.APP_API_URL)
    // Logout mutation
    const [logout] = useLogoutMutation();

    // On mount or auth state changes, fetch user details if not already authenticated
    useEffect(() => {
        if (!authState.isAuthenticated) {
            refetch();
        }
    }, [authState.isAuthenticated, refetch]);

    useEffect(() => {
        if (userDetails?.data) {
            // Save user details to Redux
            dispatch(
                setCredentials({
                    user: {
                        email: userDetails.data.email,
                        role: userDetails.data.role.name,
                        permissions: userDetails.data.role.permissions,
                    },
                    token: "your-token", // Replace with actual token logic
                })
            );

            // Extract and save preferences
            const preferences = userDetails.data.Preference?.[0] || {}; // Assuming there's only one preference object
            dispatch(
                setPreferences({
                    locations: preferences.locations || [],
                    categories: preferences.categories || [],
                    dateRange: preferences.dateRange || {
                        startDate: null,
                        endDate: null,
                    },
                    includeFree: preferences.includeFree || false,
                })
            );
        }
    }, [userDetails, dispatch]);


    const handleLogout = async () => {
        try {
            await logout({}).unwrap();
            dispatch(clearCredentials());
            router.push("/auth/signin");
            refetch();
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-background bg-opacity-80 backdrop-blur-md shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-8 py-6">
                {/* Logo */}
                <Logo />

                {/* Menu Toggle */}
                <MenuToggle isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-12">
                    <NavLinksGroup closeMenu={() => setIsMenuOpen(false)} />

                    {/* User Profile */}
                    {isLoading ? (
                        <p></p>
                    ) : authState.isAuthenticated ? (
                        <ProfileDropdown onLogout={handleLogout} />
                    ) : (
                        <ActionGroup />
                    )}
                </nav>
            </div>

            {/* Mobile Navigation */}
            <MobileNav
                isOpen={isMenuOpen}
                searchQuery={searchQuery}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
                cityOptions={cityOptions}
                closeMenu={() => setIsMenuOpen(false)}
                onLogout={handleLogout}
                isLoading={isLoading}
                isAuthenticated={authState.isAuthenticated}
                setIsMenuOpen={setIsMenuOpen}
            />
        </header>
    );
};

export default Header;
