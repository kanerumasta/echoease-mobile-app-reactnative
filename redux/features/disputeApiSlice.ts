import { apiSlice } from "../services/apiSlice";

const disputeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArtistDispute: builder.mutation<unknown, any>({
      query: (data) => ({
        method: "POST",
        url: "/disputes/artist-disputes/",
        body: data,
      }),
    }),
    createClientDispute: builder.mutation<unknown, any>({
      query: (data) => ({
        method: "POST",
        url: "/disputes/client-disputes/",
        body: data,
      }),
    }),
    createDispute: builder.mutation({
      query: (data) => ({
        url: "/disputes/",
        method: "POST",
        body: data,
      }),
    }),
    addDisputeEvidence: builder.mutation({
      query: (data) => ({
        url: "/disputes/evidences",
        method: "POST",
        body: data,
      }),
    }),
    cancelDispute:builder.mutation<any, number>({
        query:(dispute_id)=>({
            url:`/disputes/${dispute_id}/cancel`,
            method: "POST",
        })
    })
  }),
});

export const {
  useCreateArtistDisputeMutation,
  useCreateClientDisputeMutation,
  useCreateDisputeMutation,
  useAddDisputeEvidenceMutation,
  useCancelDisputeMutation
} = disputeApiSlice;
