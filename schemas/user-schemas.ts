import { z } from "zod";

export const GenderSchema = z.union([z.literal("male"), z.literal("female")]);

export const SetupProfileSchema = z.object({
  dob: z.string({ required_error: "This field is required" }),
  gender: GenderSchema,
  phone: z
    .string()
    .length(10, { message: "Phone number must be 10 digits long" })
    .regex(/^9\d{9}$/, { message: "Phone number format is invalid." }),
  country: z.string().optional().nullable(),
  province: z.string({ required_error: "This field is required" }),
  municipality: z.string({ required_error: "This field is required" }),
  brgy: z.string({ required_error: "This field is required" }),
  street: z.string({ required_error: "This field is required" }),
  zipcode: z.string({ required_error: "This field is required" }),
  profile_image: z.instanceof(File).nullable(),
  language: z.string().nullable().optional(),
  fb_page: z.string().nullable().optional(),
});

export const ProfileSchema = z.object({
  id: z.number().optional(),
  dob: z.string({ required_error: "This field is required" }),
  gender: GenderSchema,
  phone: z.string({ required_error: "This field is required" }),
  country: z.string().optional().nullable(),
  province: z.string({ required_error: "This field is required" }),
  municipality: z.string({ required_error: "This field is required" }),
  brgy: z.string({ required_error: "This field is required" }),
  street: z.string({ required_error: "This field is required" }),
  zipcode: z.string({ required_error: "This field is required" }),
  profile_image: z.string(),
  nationality: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  fb_page: z.string().nullable().optional(),
  is_complete: z.string().nullable().optional(),
  user: z.number().optional().nullable(),
  complete_address: z.string(),
  formatted_dob: z.string()
});

export const UserSchema = z.object({
  id: z.number(),
  first_name: z
    .string()
    .regex(/^[A-Za-z]+$/, "First name should contain only letters"),
  last_name: z
    .string()
    .regex(/^[A-Za-z]*$/, "Last name should contain only letters"),
  email: z.string().email(),
  is_verified: z.boolean().optional(),
  is_active: z.boolean().optional(),
  is_staff: z.boolean().optional(),
  role: z.string().optional(),
  profile: ProfileSchema,
  fullname: z.string(),
  is_roled: z.boolean(),
  has_echoee_application: z.boolean(),
  business_name: z.string().nullable(),
  business_image: z.string().nullable(),
});

export const RolePickingSchema = z.object({
  category: z.string(), //bar|organizer|regular
  production_page: z.string().nullable(),
  organizer_images: z.array(z.instanceof(File)).nullable().optional(),
  business_permit: z.instanceof(File).nullable().optional(),
  government_id: z.instanceof(File),
  government_id_type: z.string(),
  businessName: z.string().nullable().optional(),
  businessImage: z.instanceof(File).nullable().optional(),
});
