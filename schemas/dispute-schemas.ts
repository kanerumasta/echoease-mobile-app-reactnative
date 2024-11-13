import { z } from "zod";

export const DisputeSchema = z.object({
    id:z.number(),
    dispute_type:z.union([z.literal('artist'), z.literal('client')]),
    reason : z.string(),
    status:z.string(),
    created_at:z.string(),
    updated_at:z.string(),
    description:z.string(),
    is_resolved:z.boolean(),
    date_resolved:z.string().nullable(),
    notes:z.string().nullable(),
    booking:z.number().positive(),
    artist:z.number().nullable(),
    client:z.number().nullable()
})

export const ClientDisputeSchema = z.object({
  client: z.string(),
  booking: z.string(),
  reason: z.string(),
  description: z.string(),
});
export const ArtistDisputeSchema = z.object({
  artist: z.string(),
  booking: z.string(),
  reason: z.string(),
  description: z.string(),
});
