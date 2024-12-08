import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface PreferencesState {
  locations: string[];
  categories: string[];
  dateRange: DateRange;
  includeFree: boolean;
}

const initialState: PreferencesState = {
  locations: [],
  categories: [],
  dateRange: {
    startDate: null,
    endDate: null,
  },
  includeFree: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferences(state, action: PayloadAction<PreferencesState>) {
      return action.payload; // Replace the entire state with the payload
    },
    resetPreferences() {
      return initialState; // Reset to initial state
    },
  },
});

export const { setPreferences, resetPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
