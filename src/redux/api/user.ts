import { ENV } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Include token in headers if available
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Save Preferences endpoint
    savePreferences: builder.mutation({
      query: (preferences) => ({
        url: "/preferences",
        method: "POST",
        body: preferences,
      }),
    }),
    // Fetch User with Role, Permissions, and Preferences
    fetchUserWithDetails: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSavePreferencesMutation,
  useFetchUserWithDetailsQuery, 
} = userApi;
