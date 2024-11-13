import { z } from "zod";

import { BookInSchema } from "./booking-schemas";
import { MessageSchema } from "./chat-schemas";
import { UserSchema } from "./user-schemas";

//NOTIFICATION TYPES
// ('admin', 'Admin'),
// ('message', 'Message'),
// ('new_booking', 'New Booking'),
// ('new_follower', 'New Follower'),
// ('booking_confirmation', 'Booking Confirmation'),
// ('booking_rejected', 'Booking Rejected'),
// ('payment_reminder', 'Payment Reminder'),
// ('event_reminder', 'Event Reminder'),
// ('downpayment_paid', 'Down Payment Paid'),

export const NotificationInSchema = z.object({
  id: z.number(),
  notification_type: z.string(),
  title: z.string(),
  description: z.string(),
  is_read: z.boolean(),
  create_at: z.string(),
  user: UserSchema.nullable(),
  booking: BookInSchema.nullable(),
  message: MessageSchema.nullable(),
  follower: UserSchema.nullable(),
});

// "links": {
//     "next": null,
//     "previous": null
//   },
//   "total_pages": 1,
//   "current_page": 1,
//   "has_next": false,
//   "has_previous": false,
//   "count": 5,
//   "results": [

export const PaginatedNotificationSchema = z.object({
  links: z.object({
    next: z.string().nullable(),
    previous: z.string().nullable(),
  }),
  total_pages: z.number(),
  current_page: z.number(),
  has_next: z.boolean(),
  has_previous: z.boolean(),
  count: z.number(),
  results: z.array(NotificationInSchema),
});
