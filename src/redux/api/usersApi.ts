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
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: 'https://crafy-server.onrender.com/profile/update/65b39c931f9c2fdda3e822e3',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'User', id: 'me' }],
    }),
    getCompletedUser: builder.query<any, void>({
      query:()=>`users/profilecompleted`,
      transformResponse: (response: any) => {
        return response;
      }
    }),
    getAllUsers: builder.query<IUsersResponse, void>({
      query: () => `allusers`, 
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
    postJob:builder.query<any, any>({
      query: (data) => ({
        url: 'job/p-job',
        method: 'POST',
        body: data,
      }),
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
  useUpdateProfileMutation,
  useGetCompletedUserQuery,
  usePostJobQuery
} = usersApiSlice;
