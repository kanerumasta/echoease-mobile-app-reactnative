import { z } from "zod";

import { PaginatedTransactionSchema, TransactionSchema } from "../../schemas/transaction-schemas";

import { apiSlice } from "../services/apiSlice";

const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTransactions: builder.query<
      z.infer<typeof PaginatedTransactionSchema>,
      number
    >({
      query: (page) => ({
        url: `/transactions?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),
    fetchTransactionDetail:builder.query<z.infer<typeof TransactionSchema>, string>({
        query:(id) => `/transactions/${id}`
      })
  }),

});

export const { useFetchTransactionsQuery, useFetchTransactionDetailQuery } = transactionApiSlice;
