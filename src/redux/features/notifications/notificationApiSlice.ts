/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const notificationApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (credentials) => ({
        url: "notifications/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateNotification: builder.mutation({
      query: (credentials) => ({
        url: "notifications/",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
    deleteNotification: builder.mutation({
      query: (credentials) => ({
        url: "notifications/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
    getNotifications: builder.query({
      query: () => "notifications/",
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
} = notificationApiSlice;
