/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "userprofile/",
    }),
    updateUserProfile: builder.mutation({
      query: (credentials) => ({
        url: "userprofile/",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
  userApiSlice;
