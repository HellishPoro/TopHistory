import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/applicationCategory?platform=1',
      transformResponse: (response) => {
        if (response.status_code === 200 && response.data) {
          const allCategories = [];
          
          response.data.forEach(category => {
            allCategories.push({
              id: category.id,
              name: category.name,
              type: 'category'
            });
            
            if (category.categories && category.categories.length > 0) {
              category.categories.forEach(subCategory => {
                allCategories.push({
                  id: subCategory.id,
                  name: `${category.name} - ${subCategory.name}`,
                  type: 'subcategory',
                  parentId: category.id
                });
              });
            }
          });
          
          return allCategories;
        }
        throw new Error(response.message || 'Invalid response format');
      }
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;