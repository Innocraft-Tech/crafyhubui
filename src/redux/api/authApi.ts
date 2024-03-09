import apiSlice from './api';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation<any, any>({
      query: (credentials) => ({
        url: 'autho',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: 'User', id: 'me' }],
    }),
    logOut: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'User', id: 'me' }],
    }),
    register: builder.mutation<any, any>({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: 'auth/forgot',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: ({ resetToken, credentials }) => ({
        url: `auth/reset/${resetToken}`,
        method: 'PUT',
        body: credentials,
      }),
    }),
    updatePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: 'auth/password',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogOutMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
} = authApi;
