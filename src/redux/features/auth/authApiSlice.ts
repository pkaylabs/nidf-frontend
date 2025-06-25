/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/api/auth";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (formData: FormData) => ({
        url: "register/",
        method: "POST",
        body: formData,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "verifyotp/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "resetpassword/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendOTP: builder.mutation({
      query: (credentials) => ({
        url: "sendotp/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useSendOTPMutation,
  useResetPasswordMutation,
} = authApiSlice;
