import { z } from "zod"
import { UserSchema } from "./user-schemas"

export const FeedbacksInSchema = z.object({
    id:z.number(),
    rating: z.number(),
    feedback: z.string(),
    created_at: z.date(),
    booking: z.number(),
    client: UserSchema,
})

export const PaginatedFeedbacksSchema = z.object({
    links: z.object({
        next: z.string().nullable(),
        previous: z.string().nullable(),
    }),
    total_pages: z.number(),
    current_page: z.number(),
    has_next: z.boolean(),
    has_previous: z.boolean(),
    count: z.number(),
    results: z.array(FeedbacksInSchema),
})
