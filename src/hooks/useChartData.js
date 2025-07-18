import { useMemo } from 'react';
import { SUBCATEGORY_NAMES } from '../constants/subcategory_names';

export const useChartData = ({ 
  topHistoryData, 
  selectedCategories, 
  categories 
}) => {
  return useMemo(() => {
    try {
      if (!topHistoryData || !selectedCategories?.length || !categories?.length) {
        return null;
      }

      const availableCategories = selectedCategories.filter(
        catId => topHistoryData[catId] !== undefined
      );

      if (availableCategories.length === 0) {
        console.error('Нет соответствующих категорий между запросом и ответом');
        return null;
      }

      const allDates = new Set();
      
      availableCategories.forEach(categoryId => {
        const categoryData = topHistoryData[categoryId];

        Object.values(categoryData).forEach(subCategoryData => {
          if (Array.isArray(subCategoryData)) {
            subCategoryData.forEach(item => allDates.add(item.date));
          } else if (typeof subCategoryData === 'object') {
            Object.keys(subCategoryData).forEach(date => allDates.add(date));
          }
        });
      });

      const sortedDates = Array.from(allDates).sort();

      const datasets = [];
      
      availableCategories.forEach(categoryId => {
        const categoryData = topHistoryData[categoryId];
        const category = categories.find(c => c.value === categoryId);
        
        if (!category) {
            return;
        }

        Object.entries(categoryData).forEach(([subCategoryId, subCategoryData]) => {
          const subCategoryName = SUBCATEGORY_NAMES[subCategoryId] || `Subcat ${subCategoryId}`;
          
          const values = sortedDates.map(date => {
            if (Array.isArray(subCategoryData)) {
              const item = subCategoryData.find(d => d.date === date);
              return item ? item.rank : null;
            } else if (subCategoryData[date]) {
              return subCategoryData[date];
            }
            return null;
          });

          datasets.push({
            label: `${category.label} - ${subCategoryName}`,
            data: values,
            borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
            backgroundColor: `hsla(${Math.random() * 360}, 70%, 50%, 0.1)`,
            tension: 0.1
          });
        });
      });

      return {
        labels: sortedDates,
        datasets
      };
    } finally {
      console.groupEnd();
    }
  }, [topHistoryData, selectedCategories, categories]);
};