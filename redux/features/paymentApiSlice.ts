import { apiSlice } from "../services/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice:builder.mutation<{invoice_url:string},{booking_id:string, payment_type:string, redirect_url:string}>({
        query:(data) => ({
            url: "/payments/create-invoice",
            method: "POST",
            body:data
        })
    }),
    createDownPaymentIntent: builder.mutation<
      { payment_intent_id: string },
      any
    >({
      query: (data) => ({
        url: "/payments/create-downpayment-intent",
        method: "POST",
        body: data,
      }),
    }),
    attachDownPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/payments/attach-downpayment-intent",
        method: "POST",
        body: data,
      }),
    }),
    finalizeDownPayment: builder.mutation({
      query: (data) => ({
        url: "/payments/retrieve-downpayment-intent",
        method: "POST",
        body: data,
      }),
    }),
    createFinalPaymentIntent: builder.mutation<
      { payment_intent_id: string },
      { booking: number }
    >({
      query: (data) => ({
        url: "/payments/create-finalpayment-intent",
        method: "POST",
        body: data,
      }),
    }),
    attachFinalPayment: builder.mutation({
      query: (data) => ({
        url: "/payments/attach-finalpayment-intent",
        method: "POST",
        body: data,
      }),
    }),
    finalizeFinalPayment: builder.mutation({
      query: (data) => ({
        url: "/payments/retrieve-finalpayment-intent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateDownPaymentIntentMutation,
  useAttachDownPaymentIntentMutation,
  useFinalizeDownPaymentMutation,
  useCreateFinalPaymentIntentMutation,
  useAttachFinalPaymentMutation,
  useFinalizeFinalPaymentMutation,
  useCreateInvoiceMutation
} = paymentApiSlice;
