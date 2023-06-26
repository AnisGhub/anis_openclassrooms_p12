import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from a URL and processing it with a factory.
 * @param {string} url - The URL to fetch the data from.
 * @param {Object} factory - The factory object with a 'create' method to process the data.
 * @param {string} type - The type of data processing.
 * @returns {Object} An object containing the fetched data, error, and loading state.
 */
function useFetch(url, factory, type) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer to simulate loading delay
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const processedData = await response.json();
        // Process the fetched data using the factory and specified type
        const factoryCreation = factory.create(processedData.data, type);
        setData(factoryCreation);
        setIsLoading(false);
      } catch (e) {
        setError(`Une erreur est survenue : ${e.message}`);
        setIsLoading(false);
      }
    }, 1500);
    // Cleanup the timer when the component unmounts or the dependencies change
    return () => clearTimeout(timer);
  }, [url, factory, type]);
  // Return the fetched data, error, and loading state
  return { data, error, isLoading };
}

export default useFetch;
