import { z } from "zod";

import {
  NotificationInSchema,
  PaginatedNotificationSchema,
} from "../../schemas/notification-schemas";

import { apiSlice } from "../services/apiSlice";

const notificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNewNotifications: builder.query<
      z.infer<typeof NotificationInSchema>[],
      void
    >({
      query: () => "/notifications?new=True",
      providesTags: ["newNotifications"],
    }),

    countNewNotifications: builder.query<{ notifications_count: number }, void>(
      {
        query: () => "/notifications?new=True&&count=True",
      },
    ),

    fetchOldNotifications: builder.query<
      z.infer<typeof PaginatedNotificationSchema>,
      number
    >({
      query: (page) => `/notifications?old=True&page=${page}`,
      providesTags: ["oldNotifications"],
    }),
    readNotification: builder.mutation<any, string>({
      query: (id) => ({
        method: "PATCH",

        url: `/notifications/${id}/read`,
      }),
      invalidatesTags: ["oldNotifications", "newNotifications"],
    }),
    deleteNotification: builder.mutation<any, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/notifications/${id}/delete`,
      }),
      invalidatesTags: ["oldNotifications", "newNotifications"],
    }),
    markAllRead: builder.mutation<any, void>({
      query: () => ({
        url: `/notifications/mark-all-as-read`,
        method: "POST",
      }),
      invalidatesTags: ["oldNotifications", "newNotifications"],
    }),
    clearAll: builder.mutation<any, void>({
      query: () => ({
        url: `/notifications/clear-all-old-notifications`,
        method: "POST",
      }),
      invalidatesTags: ["oldNotifications"],
    }),
  }),
});

export const {
  useFetchNewNotificationsQuery,
  useCountNewNotificationsQuery,
  useFetchOldNotificationsQuery,
  useReadNotificationMutation,
  useDeleteNotificationMutation,
  useMarkAllReadMutation,
  useClearAllMutation,
} = notificationSlice;
