/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const regionApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createRegion: builder.mutation({
      query: (credentials) => ({
        url: "regions/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getRegions: builder.query({
      query: () => "regions/",
    }),
  }),
});

export const { useCreateRegionMutation, useGetRegionsQuery } = regionApiSlice;
