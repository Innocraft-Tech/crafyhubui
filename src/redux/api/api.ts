import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
// import { AppState } from '@/redux/store';
import { getAccessToken } from '@/lib/cookie';
import { clearAuth } from '@/redux/slices/authSlice';
import { redirect } from 'next/navigation';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  prepareHeaders: (headers) => {
    // const token = (getState() as AppState).auth.token;

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
  const result = await baseQuery(args, api, extraOptions);

  const resultStatus = result?.error?.status;
  if (resultStatus === 403) {
    api.dispatch(clearAuth());
    redirect('/login');
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Skills', 'Chat', 'Jobs'],
  endpoints: () => ({}),
});

export default apiSlice;
