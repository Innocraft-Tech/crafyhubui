import { default as apiSlice } from './api';
const accountInformation = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccountInformation: builder.query({
      query: (userId) => ({
        url: `/users/account/${userId}`,
        method: 'GET',
      }),
    }),
    changeUserEmail: builder.mutation({
      query: ({ userId, newEmail }) => ({
        url: `users/${userId}/email/change`,
        method: 'POST',
        body: {
          newEmail,
        },
        params: {
          userId,
        },
      }),
    }),
  }),
});
export const { useGetAccountInformationQuery, useChangeUserEmailMutation } =
  accountInformation;
