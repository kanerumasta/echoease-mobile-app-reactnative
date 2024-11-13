import { z } from "zod";

import { BookInSchema } from "./booking-schemas";

export const TransactionSchema = z.object({
  id: z.number(),
  transaction: z.string(),
  transaction_reference: z.string(),
  transaction_type: z.string(),
  status: z.string(),
  amount: z.string(),
  net_amount: z.string(),
  payment_gateway: z.string(),
  payment_intent_id: z.string(),
  service_fee: z.string(),
  payer_email: z.string(),
  payer_name: z.string(),
  platform_fee: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  booking: BookInSchema,
  client: z.number().nullable(),
  artist: z.number().nullable(),
  formatted_created_at: z.string(),
});

export const PaginatedTransactionSchema = z.object({
  links: z.object({
    next: z.string().nullable(),
    previous: z.string().nullable(),
  }),
  total_pages: z.number(),
  current_page: z.number(),
  has_next: z.boolean(),
  has_previous: z.boolean(),
  count: z.number(),
  results: z.array(TransactionSchema),
});
