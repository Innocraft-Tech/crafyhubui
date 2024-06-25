import apiSlice from './api';

const workApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWork: builder.mutation({
      query: ({ data }) => ({
        url: '/works/upload',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateWorkMutation } = workApiSlice;

export default workApiSlice;
