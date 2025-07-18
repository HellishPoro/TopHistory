import { useEffect, useState } from "react";
import { useGetTopHistoryQuery } from "../features/geo/topHistorySlice";

export const useTopHistory = ({
    countryId,
    dateFrom,
    dateTo,
    selectedCategories,
    isRangeValid
  }) => {
    const { data, isLoading, isError, error, isFetching } = useGetTopHistoryQuery(
      {
        countryId,
        dateFrom,
        dateTo,
        categories: selectedCategories?.join(',') || ''
      },
      { 
        skip: !selectedCategories?.length || !dateFrom || !dateTo || !isRangeValid,
        refetchOnMountOrArgChange: true
      }
    );
  
    const [topHistoryData, setTopHistoryData] = useState(null);
    
    useEffect(() => {
      if (data) {
        setTopHistoryData(data);
      }
    }, [data]);
  
    return {
      topHistoryData,
      isLoading: isLoading || isFetching,
      isError,
      error,
      isFetching
    };
  };