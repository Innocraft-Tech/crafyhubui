import apiSlice from './api';

const workApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWork: builder.mutation<PostWorkResponse, PostWorkPayLoad>({
      query: ({ formData, token }) => ({
        url: `/works/upload/`,
        method: 'POST',
        body: formData,

        headers: {
          // Authorization header if needed
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useCreateWorkMutation } = workApiSlice;

export default workApiSlice;
