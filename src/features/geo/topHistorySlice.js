import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const topHistoryApi = createApi({
  reducerPath: 'topHistoryApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/package/top_history/9379',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getTopHistory: builder.query({
      query: ({ countryId, dateFrom, dateTo }) => {
        if (!dateFrom || !dateTo) {
          throw new Error('Invalid date range');
        }
        return `/${countryId}?date_from=${dateFrom}&date_to=${dateTo}&platforms=1`;
      },
      transformResponse: (response) => {
        if (response?.status_code === 200 && response.data) {
          return response.data;
        }
        throw new Error(response?.message || 'Invalid response format');
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || response.error || 'Unknown error'
        };
      }
    }),
  }),
});

export const { useGetTopHistoryQuery } = topHistoryApi;