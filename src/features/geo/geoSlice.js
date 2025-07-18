import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geoApi = createApi({
  reducerPath: 'geoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getGeo: builder.query({
      query: () => '/geo',
      transformResponse: (response) => {
        if (response.status_code === 200 && response.data) {
          return response.data; 
        }
        throw new Error(response.message || 'Invalid response format');
      }
    }),
  }),
});

export const { useGetGeoQuery } = geoApi;