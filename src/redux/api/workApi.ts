import apiSlice from './api';

const workApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWork: builder.mutation<PostWorkResponse, PostWorkPayLoad>({
      query: ({ formData, token }) => ({
        url: `/works/upload/${token}`,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useCreateWorkMutation } = workApiSlice;

export default workApiSlice;
