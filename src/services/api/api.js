import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'test',
  tagTypes: ['getStats'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.65.107:3001',
  }),
  endpoints: builder => ({
    getAllStats: builder.query({
      query: () => "/stats"
    }),
    getStatsbyId: builder.query({
      query: data => ({
        method: 'GET',
        url: `/stats/${data.id}`,
      }),
    }),
    postStats: builder.mutation({
      query: data => ({
        method: 'POST',
        url: '/stats',
        body: {
          values: data.values,
          date:data.date
        },
      }),
      invalidatesTags: ['getStats'],
    }),
  }),
});

export const {usePostStatsMutation, useGetStatsbyIdQuery, useGetAllStatsQuery} = api;
