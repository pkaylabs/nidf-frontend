/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "userprofile/",
    }),
    getUsers: builder.query({
      query: () => "users/",
    }),
    updateUserProfile: builder.mutation({
      query: (credentials) => ({
        url: "userprofile/",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
    createUser: builder.mutation({
      query: (credentials) => ({
        url: "users/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    deleteUser: builder.mutation({
      query: (credentials) => ({
        url: "users/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
