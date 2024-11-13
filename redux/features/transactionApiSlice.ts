import { z } from "zod";

import { PaginatedTransactionSchema } from "../../schemas/transaction-schemas";

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
  }),
});

export const { useFetchTransactionsQuery } = transactionApiSlice;
