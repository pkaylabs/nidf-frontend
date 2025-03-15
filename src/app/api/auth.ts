/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { BACKEND_BASE_URL } from "@/constants/page-path";
import { logout, setCredentials } from "@/redux/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_BASE_URL,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Token ${token}`);
      // headers.set("token", token);
    }
    return headers;
  },
});

// const baseQueryWithReAuth: any = async (
//   args: any,
//   api: any,
//   extraOptions: any
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     // Re-auth logic here
//     const token = (api.getState() as RootState).auth.token;
//     const refreshResult = await baseQuery(
//       `/api/v1/auth/refreshToken?token=${token}`,
//       api,
//       extraOptions
//     );

//     console.log("refreshResult", refreshResult);

//     if (refreshResult?.data) {
//       const user = (api.getState() as RootState).auth.user;
//       // Store the new token
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       // Retry the original request
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       // Log out the user
//       api.dispatch(logout());
//     }
//   }
//   return result;
// };

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
