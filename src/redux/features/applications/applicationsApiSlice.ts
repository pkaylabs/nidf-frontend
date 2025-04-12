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
    processApplication: builder.mutation({
      query: (credentials) => ({
        url: "process-application/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    requestApplicationInfo: builder.mutation({
      query: (credentials) => ({
        url: "extra-application-info/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    deleteApplication: builder.mutation({
      query: (credentials) => ({
        url: "applications/",
        method: "DELETE",
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
  useProcessApplicationMutation,
  useRequestApplicationInfoMutation,
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
} = applicationApiSlice;
