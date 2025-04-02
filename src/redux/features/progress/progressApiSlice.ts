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
    verifyProgressReport: builder.mutation({
      query: (credentials) => ({
        url: "verifyreports/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    deleteProgressReport: builder.mutation({
      query: (credentials) => ({
        url: "progressreports/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
    getProgressReports: builder.query({
      query: () => "progressreports/",
    }),
  }),
});

export const {
  useCreateProgressReportMutation,
  useVerifyProgressReportMutation,
  useDeleteProgressReportMutation,
  useGetProgressReportsQuery,
} = progressApiSlice;
