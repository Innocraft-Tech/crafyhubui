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
    getAllUsers: builder.query<IUsersResponse, void>({
      query: () => 'allusers',
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
    getUser: builder.query<IUserResponse, string>({
      query: (id) => `user/${id}`,
      transformResponse: (response: any) => response,
      extraOptions: { maxRetries: 0 },
      providesTags: (result, error, id) =>
        result?.user ? [{ type: 'User', id: result.user._id }] : ['User'],
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
    }),
    updateProfile: builder.mutation<ProfileResponse, ProfileRequest>({
      query: ({ data, id }) => ({
        url: `/profile/update/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    updateEmailPreferences: builder.mutation<void, { userId: string; preferences: any }>({
      query: ({ userId, preferences }) => ({
        url: `/user/update/emailpreference/${userId}`,
        method: 'POST',
        body: { preferences },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useVerifyOtpMutation,
  useSendEmailMutation,
  useUpdateProfileMutation,
} = usersApiSlice;

export default usersApiSlice;
