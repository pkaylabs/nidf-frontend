/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const divisionApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createDivision: builder.mutation({
      query: (credentials) => ({
        url: "divisions/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateDivision: builder.mutation({
      query: (credentials) => ({
        url: "divisions/",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
    deleteDivision: builder.mutation({
      query: (credentials) => ({
        url: "divisions/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
    getDivisions: builder.query({
      query: () => "divisions/",
    }),
  }),
});

export const {
  useCreateDivisionMutation,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation,
  useGetDivisionsQuery,
} = divisionApiSlice;
