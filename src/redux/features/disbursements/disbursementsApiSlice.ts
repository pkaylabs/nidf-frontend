/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const disbursementsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createDisbursement: builder.mutation({
      query: (formData: FormData) => ({
        url: "disbursements/",
        method: "POST",
        body: formData,
      }),
    }),

    // deleteProgressReport: builder.mutation({
    //   query: (credentials) => ({
    //     url: "progressreports/",
    //     method: "DELETE",
    //     body: { ...credentials },
    //   }),
    // }),
    getDisbursements: builder.query({
      query: () => "disbursements/",
    }),
  }),
});

export const { useCreateDisbursementMutation, useGetDisbursementsQuery } =
  disbursementsApiSlice;
