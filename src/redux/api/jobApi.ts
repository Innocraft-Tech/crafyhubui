import { default as apiSlice } from './api';
const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      query: () => 'job/crafy/alljobs',
      providesTags: [{ type: 'Jobs', id: 'LIST' }],
    }),
    postJob: builder.mutation<PostJobResponse, PostJobPayload>({
      query: ({ data, id }) => ({
        url: `job/p-job`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${id}`,
        },
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
    applyJob: builder.mutation<any, { userId: string; jobId: string }>({
      query: ({ userId, jobId }) => ({
        url: `job/apply/${jobId}`,
        method: 'POST',

        body: {
          userId,
        },
      }),
    }),
    updatePostJob: builder.mutation<any, any>({
      query: ({ jobid, token, data }) => ({
        url: `job/${jobid} `,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetJobsQuery,
  usePostJobMutation,
  useGetUserPostJobQuery,
  useApplyJobMutation,
  useUpdatePostJobMutation,
} = jobApiSlice;
