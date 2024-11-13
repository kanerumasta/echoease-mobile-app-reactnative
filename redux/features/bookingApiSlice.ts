import { z } from "zod";

import { BookInSchema, PaginatedBookInSchema } from "../../schemas/booking-schemas";
import { ArtistInSchema } from "../../schemas/artist-schemas";
import { apiSlice } from "../services/apiSlice";
import { UserSchema } from "../../schemas/user-schemas";


const DetailBookingInSchema = z.object({
  id: z.number(),
  event_date: z.string(),
  event_name: z.string(),
  event_time: z.string(),
  event_location: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.string(),
  artist: ArtistInSchema,
  client: UserSchema,
});

const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMyBookings: builder.query<
      z.infer<typeof PaginatedBookInSchema>,
      {
        page:number,
        sort_by:string|null,
        sort_order:string|null,
        status:string|null,
        paginate:boolean,
        q:string|null
      }
    >({
      query: ({page, sort_by,sort_order, status, paginate, q}) => {
        const params = new URLSearchParams()
        params.append('page', page.toString())
        params.append('paginate', paginate.toString())
        if(q) params.append('q', q)
        if(sort_by) params.append('sort_by', sort_by)
        if(sort_order) params.append('sort_order', sort_order)
        if(status) params.append('status', status)
        return `/bookings?${params.toString()}`
      },
      providesTags: ["Bookings"],
    }),

    createNewBooking: builder.mutation<
      z.infer<typeof DetailBookingInSchema>,
      any
    >({
      query: (data) => ({
        method: "POST",
        url: "/bookings/",
        body: data,
      }),
      invalidatesTags: ["Bookings", "PendingBookings"],
    }),

    fetchPendingBookings: builder.query<z.infer<typeof BookInSchema>[], void>({
      query: () => `/bookings?status=pending`,
      providesTags: ["PendingBookings"],
    }),
    fetchBookingDetail: builder.query<z.infer<typeof BookInSchema>, string>({
      query: (id) => `/bookings/${id}`,
      providesTags: (result, error, id) => [{ type: "Bookings", id }],
    }),
    fetchApprovedBookings: builder.query<z.infer<typeof BookInSchema>[], void>({
      query: () => `/bookings?status=approved`,
      providesTags: (result, error, arg, meta) => ["ApprovedBookings"],
    }),
    fetchCompletedBookings: builder.query<z.infer<typeof BookInSchema>[], void>(
      {
        query: () => `/bookings?status=completed`,
        providesTags: (result, error, arg, meta) => ["CompletedBookings"],
      },
    ),
    fetchAwaitingDownpaymentBookings: builder.query<
      z.infer<typeof BookInSchema>[],
      void
    >({
      query: () => `/bookings?status=awaiting_downpayment`,
      providesTags: ["AwaitingDownpayments"],
    }),
    fetchPendingPayments: builder.query<z.infer<typeof BookInSchema>[], void>({
      query: () => `/bookings/pending-payments`,
      providesTags: ["PendingPayments"],
    }),
    fetchUpcomingEvents: builder.query<z.infer<typeof BookInSchema>[], void>({
      query: () => "/bookings/upcoming-events",
      providesTags: ["UpcomingEvents"],
    }),

    confirmBooking: builder.mutation<any, string>({
      query: (id) => ({
        method: "PATCH",
        url: `/bookings/${id}/confirm`,
      }),
      invalidatesTags: ["Bookings", "PendingBookings", "AwaitingDownpayments"],
    }),
    rejectBooking: builder.mutation<any, { bookingId: number; reason: string }>(
      {
        query: (data) => ({
          method: "PATCH",
          url: `/bookings/${data.bookingId}/reject`,
          body: {
            reason: data.reason,
          },
        }),
        invalidatesTags: ["Bookings", "PendingBookings"],
      },
    ),
    cancelBooking: builder.mutation<any, { bookingId: number; reason: string }>(
      {
        query: (data) => ({
          url: `/bookings/${data.bookingId}/cancel`,
          method: "PATCH",
          body: {
            cancel_reason: data.reason,
          },
        }),
      },
    ),
  }),
});

export const {
  useCreateNewBookingMutation,
  useFetchMyBookingsQuery,
  useConfirmBookingMutation,
  useCancelBookingMutation,
  useRejectBookingMutation,
  useFetchBookingDetailQuery,
  useFetchPendingBookingsQuery,
  useFetchApprovedBookingsQuery,
  useFetchAwaitingDownpaymentBookingsQuery,
  useFetchCompletedBookingsQuery,
  useFetchPendingPaymentsQuery,
  useFetchUpcomingEventsQuery,
} = bookingApiSlice;
