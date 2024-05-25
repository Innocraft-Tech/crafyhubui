import apiSlice from './api';

const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      query: () => 'job/crafy/alljobs',
      providesTags: [{ type: 'Jobs', id: 'LIST' }],
    }),
    postJob: builder.mutation<PostJobResponse, PostJobPayload>({
      query: (data) => ({
        url: 'job/p-job',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Jobs', id: 'LIST' }],
    }),
  }),
});

export const { useGetJobsQuery, usePostJobMutation } = jobApiSlice;
