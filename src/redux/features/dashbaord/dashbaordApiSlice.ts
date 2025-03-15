/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const dashboardApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "dashboard/",
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApiSlice;
