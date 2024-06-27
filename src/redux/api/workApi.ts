import apiSlice from './api';

const workApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWork: builder.mutation<PostWorkResponse, PostWorkPayLoad>({
      query: ({ data, token }) => ({
        url: `/works/upload/${token}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateWorkMutation } = workApiSlice;

export default workApiSlice;
