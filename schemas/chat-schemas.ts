import { z } from "zod";

import { UserSchema } from "./user-schemas";

export const ChatSchema = z.object({
  code: z.string(),
  user: UserSchema,
  partner: UserSchema,
  unread_messages_count: z.number(),
  last_message:z.string(),
  last_message_time:z.string()
});

export const MessageSchema = z.object({
  id: z.string(),
  author: z.string().email(),
  content: z.string(),
  created_at: z.string(),
});
//   "code": "e0deb1e6-282e-4637-9e1b-2720f207092f",
//   "messages": [
//     {
//       "id": 1,
//       "content": "dfgdg",
//       "author": 12,
//       "created_at": "2024-10-15T05:58:22.163Z"
//     }
//   ],
//   "has_next": false,
//   "has_previous": true,
//   "current_page": 2,
//   "total_pages": 2

export const ChatDetailSchema = z.object({
  code: z.string(),
  messages: z.array(MessageSchema),
  has_next: z.boolean(),
  has_previous: z.boolean(),
  current_page: z.number(),
  total_pages: z.number(),
});
