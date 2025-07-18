import { useMemo } from "react";
import { useGetCategoriesQuery } from "../features/geo/categoriesSlice";

export const useCategories = () => {
  const { 
    data: categoriesData, 
    isLoading, 
    isError,
    error 
  } = useGetCategoriesQuery();

  const categories = useMemo(() => {
    return categoriesData?.map(category => ({
      value: String(category.id),
      label: category.name,
      type: category.type
    })) || [];
  }, [categoriesData]);

  return {
    categories,
    isLoading,
    isError,
    error
  };
};