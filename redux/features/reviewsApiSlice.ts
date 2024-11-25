import { PaginatedFeedbacksSchema } from "@/schemas/review-schemas";
import { apiSlice } from "../services/apiSlice";
import { z } from "zod";

const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchArtistRating: builder.query<{ rating__avg: number }, number>({
      query: (artistId) => `/reviews/artist-reviews/${artistId}`,
    }),
    postAReview: builder.mutation<any, {
        booking:number,
        rating:number,
        client_id:number,
        feedback:string
    }>({
      query: (data) => ({
        method: "POST",
        url: "/reviews/",
        body: data,
      }),
      invalidatesTags: ["Bookings", "CompletedBookings"],
    }),
    fetchArtistFeedbacks:builder.query<z.infer<typeof PaginatedFeedbacksSchema>,{artistId:number, page:number}>({
        query:(data)=>`/reviews/feedbacks/${data.artistId}?page=${data.page}`
    })
  }),
});

export const { useFetchArtistRatingQuery, usePostAReviewMutation, useFetchArtistFeedbacksQuery } =
  reviewsApiSlice;
