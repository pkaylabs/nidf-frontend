/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const churchApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createChurch: builder.mutation({
      query: (formData: FormData) => ({
        url: "churches/",
        method: "POST",
        body: formData,
      }),
    }),
    udpateChurch: builder.mutation({
      query: (formData: FormData) => ({
        url: "churchprofile/",
        method: "PUT",
        body: formData,
      }),
    }),
    getChurches: builder.query({
      query: () => "churches/",
    }),
    getChurchProfile: builder.query({
      query: () => "churchprofile/",
    }),
  }),
});

export const {
  useCreateChurchMutation,
  useUdpateChurchMutation,
  useGetChurchesQuery,
  useGetChurchProfileQuery,
} = churchApiSlice;
