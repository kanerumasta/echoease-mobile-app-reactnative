import { z } from "zod";

export const UnavailableDateSchema = z.object({
  id: z.number(),
  date: z.string(),
  artist: z.number(),
});

export const WeekdayAvailabilitySchema = z.object({
  day_of_week: z.string(),
  is_available: z.boolean(),
});

export const AvailabilitySchema = z.object({
  id: z.number(),
  day_of_week: z.number(),
  start_time: z.string(),
  end_time: z.string(),
  is_recurring: z.boolean(),
});
