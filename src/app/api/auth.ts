// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
// import { BACKEND_BASE_URL } from "@/constants/page-path";
// import { logout, setCredentials } from "@/redux/features/auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BACKEND_BASE_URL,
//   // credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set("authorization", `Token ${token}`);
//       // headers.set("token", token);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReAuth: any = async (
//   args: any,
//   api: any,
//   extraOptions: any
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     // logout the user
//     api.dispatch(logout());
//   }
//   return result;
// };

// export const api = createApi({
//   baseQuery: baseQueryWithReAuth,
//   endpoints: () => ({}),
// });

import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { BACKEND_BASE_URL } from "@/constants/page-path";
import { logout } from "@/redux/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Token ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Log out the user if unauthorized
    api.dispatch(logout());
  }
  return result;
};

export const api = createApi({
  reducerPath: "api", // A unique key for the API slice in your Redux store
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
