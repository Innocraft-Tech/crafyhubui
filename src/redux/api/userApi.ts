import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const singleUserApi = createApi({
    reducerPath: 'singleUserApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://localhost:7103/api/'}),
    endpoints: (builder) => ({
        getUserData:builder.query({
            query: (id) => `user/${id}`,
        })
    })
})


export const {useGetUserDataQuery} = singleUserApi;
