import { useMemo } from 'react';
import { useGetGeoQuery } from '../features/geo/geoSlice';

export const useCountries = () => {
  const { 
    data: geoData, 
    isLoading, 
    isError, 
    error 
  } = useGetGeoQuery();

  const countries = useMemo(() => {
    return geoData?.map(country => ({
      value: String(country.id),
      label: country.country
    })) || [];
  }, [geoData]);

  return {
    countries,
    isLoading,
    isError,
    error: error?.error || null
  };
};