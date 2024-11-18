import { z } from "zod";
import apiSlice from "../services/apiSlice";
import { UserSchema } from "../../schemas/user-schemas";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/jwt/create/',
                method: 'POST',
                body: data,
            })
        }),
        getUser: builder.query<z.infer<typeof UserSchema>, void>({
            query: () => '/whoami',
            providesTags: ["CurrentUser"]
        }),
        uploadImage: builder.mutation({
            query: (data) => ({
                url: `/profile/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ["CurrentUser"]
        }),
        resetPassword: builder.mutation({
            query: (email) => ({
              url: "/users/reset_password/",
              method: "POST",
              body: { email },
            }),
          }),

        logoutUser: builder.mutation<any, void>({
            query: () => ({
              url: "/logout/",
              method: "POST",
            }),
          }),
          activateUser:builder.mutation<any, void>({
            query: () => ({
              url: "/activate/",
              method: "POST",

            }),
            invalidatesTags:['CurrentUser']
          }),
          deactivateUser:builder.mutation<any, void>({
            query: () => ({
              url: "/deactivate/",
              method: "POST",
            }),
            invalidatesTags:['CurrentUser']
          }),
    })
})

export const {useDeactivateUserMutation,useActivateUserMutation,useResetPasswordMutation,useLogoutUserMutation,useLoginMutation, useGetUserQuery, useUploadImageMutation} = authApiSlice;

export default authApiSlice;
