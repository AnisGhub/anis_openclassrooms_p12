import { useState, useEffect } from 'react';

function useFetch(url, factory, type) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const processedData = await response.json();
        const factoryCreation = factory.create(processedData.data, type);
        setData(factoryCreation);
        setIsLoading(false);
      } catch (e) {
        setError(`Une erreur est survenue : ${e.message}`);
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [url, factory, type]);

  return { data, error, isLoading };
}

export default useFetch;
