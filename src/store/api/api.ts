import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { redirect } from 'next/navigation';
import { clearAuth } from 'store/slices/authSlice';
import { getAccessToken } from 'utils/cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  prepareHeaders: (headers, { getState }) => {
    const token = getAccessToken();
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const resultStatus = result?.error?.status;
  if (resultStatus === 403) {
    api.dispatch(clearAuth());
    redirect('/login');
  }

  return result;
};

const apiSlice = createApi({
  // reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Skills', 'Chat'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
