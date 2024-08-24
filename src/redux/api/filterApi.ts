import apiSlice from './api';

const filterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    filterRole: builder.mutation({
      query: (roles) => ({
        url: `/users/filter/${roles}`,
        method: 'POST',
        body: JSON.stringify({ roles }),
      }),
    }),
    filterCategory: builder.mutation({
      query: (category) => ({
        url: `/users/filter/${category}`,
        method: 'POST',
        body: category,
      }),
    }),
    filterLocation: builder.mutation<any, string[]>({
      query: (locations) => ({
        url: `/users/location`,
        method: 'POST',
        body: locations,
      }),
    }),
  }),
});

export const {
  useFilterRoleMutation,
  useFilterCategoryMutation,
  useFilterLocationMutation,
} = filterApiSlice;

export default filterApiSlice;
