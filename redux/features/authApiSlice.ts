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

        logoutUser: builder.mutation<any, void>({
            query: () => ({
              url: "/logout/",
              method: "POST",
            }),
          }),
    })
})

export const {useLogoutUserMutation,useLoginMutation, useGetUserQuery, useUploadImageMutation} = authApiSlice;

export default authApiSlice;
