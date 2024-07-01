import apiSlice from './api';

const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      query: () => 'job/crafy/alljobs',
      providesTags: [{ type: 'Jobs', id: 'LIST' }],
    }),
    postJob: builder.mutation<PostJobResponse, PostJobPayload>({
      query: ({ data, id }) => ({
        url: `job/post-job/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Jobs', id: 'LIST' }],
    }),
    getUserPostJob: builder.query({
      query: (userId) => ({
        url: `Job/jobs/user/${userId}`,
        method: 'GET',
        providesTags: [{ type: 'Jobs', id: `${userId}` }],
      }),
    }),
  }),
});

export const { useGetJobsQuery, usePostJobMutation, useGetUserPostJobQuery } =
  jobApiSlice;
