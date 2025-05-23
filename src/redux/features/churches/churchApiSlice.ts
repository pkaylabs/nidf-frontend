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
    getChurches: builder.query({
      query: () => "churches/",
    }),
  }),
});

export const { useCreateChurchMutation, useGetChurchesQuery } = churchApiSlice;
