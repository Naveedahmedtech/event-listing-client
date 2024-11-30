import { ENV } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const predictHQApi = createApi({
  reducerPath: "predictHQApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.PREDICTHQ_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${ENV.PREDICTHQ_API_ACCESS_TOKEN}`);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `events/?${queryString}`;
      },
    }),
    getEvent: builder.query({
      query: (id) => `events/${id}`, 
    }),
  }),
});

export const { useGetEventsQuery, useGetEventQuery } = predictHQApi;
