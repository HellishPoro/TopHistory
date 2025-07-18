import { useState, useMemo } from 'react';
import dayjs from 'dayjs';

export const useDateRange = (initialDaysBack = 7) => {
  const [dateRange, setDateRange] = useState(() => [
    dayjs().subtract(initialDaysBack, 'days').toDate(),
    new Date(),
  ]);

  const { dateFrom, dateTo, isRangeValid, rangeError } = useMemo(() => {
    if (!dateRange[0] || !dateRange[1]) {
      return {
        dateFrom: null,
        dateTo: null,
        isRangeValid: false,
        rangeError: null
      };
    }

    const start = dayjs(dateRange[0]);
    const end = dayjs(dateRange[1]);
    const daysDiff = end.diff(start, 'day');

    let error = null;
    if (end.isBefore(start)) {
      error = "End date cannot be before start date";
    } else if (daysDiff > 30) {
      error = "You can only select a period of up to 30 days";
    }

    return {
      dateFrom: start.format('YYYY-MM-DD'),
      dateTo: end.format('YYYY-MM-DD'),
      isRangeValid: !error,
      rangeError: error
    };
  }, [dateRange]);

  return {
    dateRange,
    setDateRange,
    dateFrom,
    dateTo,
    isRangeValid,
    rangeError
  };
};