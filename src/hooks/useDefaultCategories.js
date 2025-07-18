import { useState, useEffect } from 'react';

export const useDefaultCategories = (categories) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
  
    useEffect(() => {
      if (categories.length > 0 && selectedCategories.length === 0) {
        const availableCategories = categories
          .filter(cat => cat.type === 'category')
          .map(cat => cat.value);
        
        setSelectedCategories(availableCategories.slice(0, 3));
      }
    }, [categories]);
  
    return [selectedCategories, setSelectedCategories];
  };