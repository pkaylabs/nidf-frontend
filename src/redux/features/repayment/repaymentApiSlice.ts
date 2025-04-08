/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const repaymentApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createRepayment: builder.mutation({
      query: (formData: FormData) => ({
        url: "repayments/",
        method: "POST",
        body: formData,
      }),
    }),
    verifyRepayment: builder.mutation({
      query: (credentials) => ({
        url: "verifyrepayments/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateRepayment: builder.mutation({
      query: (credentials) => ({
        url: "repayments/",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
    deleteRepayment: builder.mutation({
      query: (credentials) => ({
        url: "repayments/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
    getRepayments: builder.query({
      query: () => "repayments/",
    }),
  }),
});

export const {
  useCreateRepaymentMutation,
  useVerifyRepaymentMutation,
  useUpdateRepaymentMutation,
  useDeleteRepaymentMutation,
  useGetRepaymentsQuery,
} = repaymentApiSlice;
