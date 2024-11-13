import { apiSlice } from "../services/apiSlice";

const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchArtistRating: builder.query<{ rating__avg: number }, number>({
      query: (artistId) => `/reviews/artist-reviews/${artistId}`,
    }),
    postAReview: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/reviews/",
        body: data,
      }),
      invalidatesTags: ["Bookings", "CompletedBookings"],
    }),
  }),
});

export const { useFetchArtistRatingQuery, usePostAReviewMutation } =
  reviewsApiSlice;
