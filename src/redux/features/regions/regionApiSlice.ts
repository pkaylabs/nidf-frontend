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
    updateRegion: builder.mutation({
      query: (credentials) => ({
        url: "regions/",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
    deleteRegion: builder.mutation({
      query: (credentials) => ({
        url: "regions/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
    getRegions: builder.query({
      query: () => "regions/",
    }),
  }),
});

export const {
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
  useGetRegionsQuery,
} = regionApiSlice;
