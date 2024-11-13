import { z } from "zod";

import { UserSchema } from "./user-schemas";
const MAX_TOTAL_SIZE = 150 * 1024 * 1024;

export const GenreOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});
export const RateSchema = z.object({
  id: z.number(),
  amount: z.number(),
  name: z.string(),
  artist_application: z.number(),
  artist: z.number(),
  description: z.string().nullable(),
});

export const GenreSchema = z.object({
  id: z.number().min(1),
  name: z.string(),
});
export const AcceptedIDsSchema = z.object({
  id: z.number().min(1),
  name: z.string(),
});

export const ArtistApplicationSchema = z.object({
  idType: z.string(),

  //idtypeinstring is just a helper to set the id type in string to be used by the picker.
  idTypeInString: z.string().nullable().optional(),

  frontId: z.instanceof(File),
  backId: z.instanceof(File),
  sampleVideos: z
    .array(z.instanceof(File), {
      required_error: "At least 2 videos are required.",
    })
    .min(2, "Add at least 2 videos.")
    .max(3, "You can only upload up to 3 videos.")
    .refine(
      (files) => {
        const totalSize = files.reduce((sum, file) => sum + file.size, 0);

        return totalSize <= MAX_TOTAL_SIZE;
      },
      {
        message: `Total file size must be less than or equal to ${MAX_TOTAL_SIZE / 1024 / 1024} MB.`,
      },
    ),

  genres: z.array(z.string()).min(1, "Pick at least 1 genre."),
  idol: z.string().nullable().optional(),

  yearsExperience: z.number().nullable().optional(),
  youtube: z.string().nullable().optional(),
  spotify: z.string().nullable().optional(),
  instagram: z.string().optional().nullable(),
  twitter: z.string().nullable().optional(),
  fb_link: z.string().nullable().optional(),
  bio: z.string(),
  stage_name: z.string().nullable().optional(),
  rates: z
    .array(
      z.object({
        artist_application: z.string().nullable().optional(),
        name: z.string(),
        amount: z.string(),
      }),
    )
    .min(1, "You must add at least one artist rate."),
});

export const ArtistInSchema = z.object({
  id: z.number(),
  bio: z.string().nullable(),
  user: UserSchema,
  slug: z.string().nullable(),
  fb_link: z.string().nullable(),
  instagram: z.string().nullable(),
  twitter: z.string().nullable(),
  status: z.string().nullable(),
  spotify: z.string().nullable(),
  youtube: z.string().nullable(),
  idol: z.string().nullable(),
  years_experience: z.number().nullable(),
  award_image1: z.string().nullable(),
  award_image2: z.string().nullable(),
  award_image3: z.string().nullable(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).nullable(),
  followers: z.array(z.number()),
  portfolio: z.number(),
  connections: z.array(z.number()),
  rates: z.array(RateSchema),
  stage_name: z.string().nullable(),
  is_new: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CreatePortfolioItemSchema = z
  .object({
    portfolio: z.string(),
    title: z.string().min(1, { message: "A portfolio needs a title." }),
    description: z.string(),
    group: z.string().optional().nullable(),
    videos: z
      .array(z.instanceof(File))
      .max(2, { message: "You can only upload two videos." })
      .nullable()
      .optional(),
    images: z
      .array(z.instanceof(File))
      .max(5, { message: "You can only upload upto 5 images." })
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.images && !data.videos) {
        return false;
      }

      return true;
    },
    { message: "Attach at least an image or a video.", path: ["images"] },
  );

export const MediaSchema = z.object({
  id: z.number(),
  media_type: z.string(),
  file: z.string(),
  portfolio_item: z.number(),
});

export const InPortfolioItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  group: z.string(),
  medias: z.array(MediaSchema),
  portfolio: z.number(),
});

export const InPortfolioSchema = z.object({
  id: z.number(),
  items: z.array(InPortfolioItemSchema),
  artist: z.number(),
});

export const ConnectionRequestSchema = z.object({
  id: z.number(),
  timestamp: z.string(),
  status: z.string(),
  sender: ArtistInSchema,
  receiver: ArtistInSchema,
});

export const MyConnectionsSchema = z.object({
  connections: z.array(ArtistInSchema),
});

export const RecommendedArtistsConnectionsSchema = z.object({
  id: z.number(),
  user: UserSchema,
  slug: z.string(),
  genres: z.array(GenreSchema),
  mutual: z.array(ArtistInSchema),
});


// "links": {
//     "next": "http://localhost:8000/api/artists/?page=2",
//     "previous": null
//   },
//   "total_pages": 2,
//   "current_page": 1,
//   "has_next": true,
//   "has_previous": false,
//   "count": 12,
//   "results":

export const PaginatedArtistInSchema = z.object({
    links: z.object({
        next: z.string().nullable(),
        previous: z.string().nullable(),
    }),
    total_pages: z.number(),
    current_page: z.number(),
    has_next: z.boolean(),
    has_previous: z.boolean(),
    count: z.number(),
    results: z.array(ArtistInSchema)
})
