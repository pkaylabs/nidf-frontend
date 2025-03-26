/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const progressApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createProgressReport: builder.mutation({
      query: (formData: FormData) => ({
        url: "progressreports/",
        method: "POST",
        body: formData,
      }),
    }),
    // finalCreateApplication: builder.mutation({
    //   query: (credentials) => ({
    //     url: "applications/",
    //     method: "PUT",
    //     body: { ...credentials },
    //   }),
    // }),
    getProgressReports: builder.query({
      query: () => "progressreports/",
    }),
  }),
});

export const { useCreateProgressReportMutation, useGetProgressReportsQuery } =
  progressApiSlice;
