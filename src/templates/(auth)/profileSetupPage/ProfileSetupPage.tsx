"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/atoms/Button";
import MultiSelect from "@/atoms/form/MultiSelect";
import ReactDatePicker from "react-datepicker";
import { locations, predicthqCategories } from "@/mock";
import { useSavePreferencesMutation } from "@/redux/api/user";
import { useAppDispatch } from "@/hooks/redux";
import { setPreferences } from "@/redux/slices/preferencesSlice"; 

const ProfileSetupPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savePreferences, { isLoading }] = useSavePreferencesMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const preferences = {
      locations: selectedLocation.map((loc) => loc.value),
      categories: selectedCategories.map((cat) => cat.value),
      dateRange: { startDate, endDate },
      includeFree: false, 
    };

    try {
      // Save preferences via API
      await savePreferences(preferences).unwrap();

      // Save preferences in Redux slice
      dispatch(setPreferences(preferences));

      router.push("/confirmation"); // Redirect on success
    } catch (err: any) {
      console.error("Error saving preferences:", err);
      setError(err.data?.message || "Failed to save preferences. Please try again.");
    }
  };

  const handleSkip = () => {
    router.push("/dashboard"); // Adjust the route for skipping setup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg p-8 bg-surface rounded-lg shadow space-y-8">
        <h1 className="text-2xl font-bold text-primary text-center">
          Set Up Your Preferences
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* MultiSelect for Locations */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-textSecondary">
              Preferred Locations
            </label>
            <MultiSelect
              options={locations}
              value={selectedLocation}
              onChange={setSelectedLocation}
              placeholder="Select locations"
            />
          </div>

          {/* MultiSelect for Categories */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-textSecondary">
              Event Categories
            </label>
            <MultiSelect
              options={predicthqCategories}
              value={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Select categories"
            />
          </div>

          {/* Date Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-textSecondary">
                Start Date
              </label>
              <ReactDatePicker
                selected={startDate}
                onChange={setStartDate}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text focus:ring-primary focus:border-primary"
                placeholderText="Select start date"
                calendarClassName="custom-calendar"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-textSecondary">
                End Date
              </label>
              <ReactDatePicker
                selected={endDate}
                onChange={setEndDate}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text focus:ring-primary focus:border-primary"
                placeholderText="Select end date"
                calendarClassName="custom-calendar"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-error text-center">{error}</p>}

          {/* Buttons */}
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={handleSkip}
            >
              Skip
            </Button>
            <Button type="submit" variant="primary" className="flex-1" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
