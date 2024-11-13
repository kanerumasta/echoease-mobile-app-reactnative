import { z } from "zod";

import {
  AvailabilitySchema,
  UnavailableDateSchema,
} from "../../schemas/schedule-schemas";
import { TimeSlotSchema } from "../../schemas/booking-schemas";

import { apiSlice } from "../services/apiSlice";

const scheduleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //WILL GET (date) as DATA
    createUnavailableDate: builder.mutation<any, any>({
      query: (data) => ({
        url: `/schedule/artist-unavailable-dates`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MyUnavailableDates"],
    }),
    deleteUnavailableDate: builder.mutation<any, number>({
      query: (dateId) => ({
        url: `/schedule/artist-unavailable-dates/delete/${dateId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyUnavailableDates"],
    }),
    createRecurringPattern: builder.mutation<any, any>({
      query: (data) => ({
        url: `/schedule/recurring-patterns`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ScheduledDays", "CombinedAvailability"],
    }),
    createAvailability: builder.mutation<any, any>({
      query: (data) => ({
        url: `/schedule/availabilities`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ScheduledDays", "CombinedAvailability"],
    }),
    deleteAvailability: builder.mutation<any, number>({
      query: (availability_id) => ({
        url: `/schedule/availabilities/${availability_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ScheduledDays", "CombinedAvailability"],
    }),
    deleteRecurringPattern: builder.mutation<any, number>({
      query: (recurring_id) => ({
        url: `/schedule/recurring-patterns/${recurring_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ScheduledDays", "CombinedAvailability"],
    }),
    editAvailabilityTime: builder.mutation<
      any,
      { id: number; data: { start_time: string; end_time: string } }
    >({
      query: (data) => ({
        url: `/schedule/availabilities/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["ScheduledDays", "CombinedAvailability"],
    }),
    editRecurringPatternTime: builder.mutation<
      any,
      { id: number; data: { start_time: string; end_time: string } }
    >({
      query: (data) => ({
        url: `/schedule/recurring-patterns/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["ScheduledDays", "CombinedAvailability"],
    }),

    //FETCHES
    fetchArtistUnavailableDates: builder.query<
      z.infer<typeof UnavailableDateSchema>[],
      number
    >({
      query: (artist) => `/schedule/artist-unavailable-dates/${artist}`,
      providesTags: ["MyUnavailableDates"],
    }),
    fetchArtistAvailabilities: builder.query<
      z.infer<typeof TimeSlotSchema>[],
      { artist: number; date: string }
    >({
      query: ({ artist, date }) =>
        `/schedule/artist-time-slot/${artist}/${date}`,
    }),
    fetchArtistWeekdaysAvailability: builder.query<number[], number>({
      query: (artist) => `/schedule/artist-weekdays/${artist}`,
    }),
    fetchArtistScheduleDays: builder.query<
      z.infer<typeof AvailabilitySchema>[],
      number
    >({
      query: (artist) => `/schedule/artist-schedule/${artist}`,
      providesTags: ["ScheduledDays"],
    }),

    fetchCombinedAvailability: builder.query<
      z.infer<typeof AvailabilitySchema>[],
      number
    >({
      query: (artist) => `/schedule/combined-availability/${artist}`,
      providesTags: ["CombinedAvailability"],
    }),
  }),
});

export const {
  useDeleteUnavailableDateMutation,
  useCreateUnavailableDateMutation,
  useCreateAvailabilityMutation,
  useCreateRecurringPatternMutation,
  useDeleteAvailabilityMutation,
  useDeleteRecurringPatternMutation,
  useEditRecurringPatternTimeMutation,
  useEditAvailabilityTimeMutation,

  //FETCHES
  useFetchArtistUnavailableDatesQuery,
  useFetchArtistAvailabilitiesQuery,
  useFetchArtistWeekdaysAvailabilityQuery,
  useFetchArtistScheduleDaysQuery,
  useFetchCombinedAvailabilityQuery,
} = scheduleApiSlice;
