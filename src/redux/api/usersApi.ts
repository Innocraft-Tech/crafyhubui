import apiSlice from './api';

interface IUsersResponse {
  users: User[];
  ip: string;
}

interface IUserResponse {
  user: User;
}

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<any, any>({
      query: () => 'users/me',
      providesTags: [{ type: 'User', id: 'me' }],
    }),
    updateMe: builder.mutation<any, any>({
      query: (data) => ({
        url: 'users/me',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'User', id: 'me' }],
    }),
    getAllUsers: builder.query<IUsersResponse, void>({
      query: () => 'allusers',
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
    getUser: builder.query<IUserResponse, string>({
      query: (id) => `user/${id}`,
      transformResponse: (response: any) => {
        return response;
      },
      providesTags: (result, error, id) =>
        result ? [{ type: 'User', id }] : ['User'],
    }),
    verifyOtp: builder.mutation<OtpResponse, OtpRequest>({
      query: (data) => ({
        url: 'verify-otp',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.invalidateTags([{ type: 'User', id: arg.userId }]),
          );
        } catch (error) {
          /* empty */
        }
      },
    }),

    sendEmail: builder.mutation<EmailResponse, EmailRequest>({
      query: (data) => ({
        url: 'emailverification',
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: [{ type: 'User', id: 'me' }],
    }),
    // updateUser:
    // deleteUser:
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useVerifyOtpMutation,
  useSendEmailMutation,
} = usersApiSlice;
