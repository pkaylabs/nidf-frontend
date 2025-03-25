/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const applicationApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createApplication: builder.mutation({
      query: (formData: FormData) => ({
        url: "applications/",
        method: "POST",
        body: formData,
      }),
    }),
    finalCreateApplication: builder.mutation({
      query: (credentials) => ({
        url: "applications/",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
    getApplications: builder.query({
      query: () => "applications/",
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useFinalCreateApplicationMutation,
  useGetApplicationsQuery,
} = applicationApiSlice;
