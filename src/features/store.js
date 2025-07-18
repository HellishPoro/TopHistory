import { configureStore } from '@reduxjs/toolkit';
import { geoApi } from './geo/geoSlice';
import { categoriesApi } from './geo/categoriesSlice';
import { topHistoryApi } from './geo/topHistorySlice';

export const store = configureStore({
  reducer: {
    [geoApi.reducerPath]: geoApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [topHistoryApi.reducerPath]: topHistoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      geoApi.middleware,
      categoriesApi.middleware,
      topHistoryApi.middleware
    ),
});
