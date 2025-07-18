import { useEffect, useState, useMemo } from "react";
import { Flex, Loader } from "@mantine/core";
import { useCategories, useChartData, useCountries, useDateRange, useDefaultCategories } from "../../hooks";
import { useTopHistory } from "../../hooks/useTopHistory";
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { ExportButtons } from '../ExportButtons/ExportButtons';
import { FiltersPanel } from '../FiltersPanel/FiltersPanel';
import { ChartPanel } from '../ChartPanel/ChartPanel';
import { EmptyState } from '../EmptyState/EmptyState';

export const TopHistoryContainer = () => {
  const [selectedCountry, setSelectedCountry] = useState("60");
  const [error, setError] = useState("");
  const [touchedDates, setTouchedDates] = useState(false);
  
  const { dateRange, setDateRange, dateFrom, dateTo, isRangeValid, rangeError } = useDateRange(7);
  const { countries, isLoading: isGeoLoading, error: geoError } = useCountries();
  const { categories, isLoading: isCategoriesLoading, error: categoriesError } = useCategories();
  const [selectedCategories] = useDefaultCategories(categories);
  
  const validCategories = useMemo(() => {
    if (!categories.length) return [];
    return selectedCategories.filter(cat => 
      categories.some(c => c.value === cat)
    );
  }, [selectedCategories, categories]);

  const { topHistoryData, isLoading: isHistoryLoading, error: historyError } = useTopHistory({
    countryId: selectedCountry,
    dateFrom,
    dateTo,
    selectedCategories: validCategories,
    isRangeValid
  });

  const chartData = useChartData({ 
    topHistoryData, 
    selectedCategories: validCategories, 
    categories 
  });

  useEffect(() => {
    const error = rangeError || geoError || categoriesError || historyError;
    setError(error?.message || "");
  }, [rangeError, geoError, categoriesError, historyError]);

  const loading = isGeoLoading || isCategoriesLoading || isHistoryLoading;

  return (
    <Flex direction="column" style={{ flex: 1, minHeight: 0, width: '100%' }}>
      <ErrorAlert error={error} />
      
      <FiltersPanel
        countries={countries}
        selectedCountry={selectedCountry}
        dateRange={dateRange}
        setSelectedCountry={setSelectedCountry}
        setDateRange={(range) => {
          setDateRange(range);
          setTouchedDates(true);
        }}
        loading={loading}
      />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {loading ? (
          <Flex align="center" justify="center" style={{ flex: 1 }}>
            <Loader type="dots" size="xl"/>
          </Flex>
        ) : chartData ? (
          <>
            <ExportButtons chartData={chartData} />
            <ChartPanel chartData={chartData} />
          </>
        ) : (
          <EmptyState touchedDates={touchedDates} />
        )}
      </div>
    </Flex>
  );
};