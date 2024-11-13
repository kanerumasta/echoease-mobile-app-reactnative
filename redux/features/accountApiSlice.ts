import { z } from "zod";

import { ProfileSchema, UserSchema } from "../../schemas/user-schemas";
import { apiSlice } from "../services/apiSlice";

const AccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMyProfile: builder.query<z.infer<typeof ProfileSchema>, void>({
      query: () => "/profile/",
    }),
    fetchProfileById: builder.query<
      z.infer<typeof ProfileSchema>,
     number
    >({
      query: (userId) => `/profile/${userId}`,
    }),
    fetchUserDetailById: builder.query<z.infer<typeof UserSchema>, string>({
      query: (userId) => `/users/${userId}`,
    }),
    profileSetup: builder.mutation<void, any>({
      query: (profileData) => ({
        url: "/profile/",
        method: "PUT",
        body: profileData,
      }),
    }),
    rolePick: builder.mutation({
      query: (data) => ({
        url: "/role-pick",
        method: "PATCH",
        body: data,
      }),
    }),
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        method: "PATCH",
        url: "/profile/",
        body: data,
      }),
      invalidatesTags: ["CurrentUser", "CurrentArtist"],
    }),

    updateName: builder.mutation<any, any>({
      query: (data) => ({
        method: "PATCH",
        url: "/change-name",
        body: data,
      }),
      invalidatesTags: ["CurrentUser", "CurrentArtist"],
    }),
    changePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchMyProfileQuery,
  useFetchProfileByIdQuery,
  useProfileSetupMutation,
  useRolePickMutation,
  useUpdateProfileMutation,
  useUpdateNameMutation,
  useChangePasswordMutation,
  useFetchUserDetailByIdQuery,
} = AccountApiSlice;

const ChangeProfileSchema = z.object({
  profile_image: z.instanceof(File),
});
