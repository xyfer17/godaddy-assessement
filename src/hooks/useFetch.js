import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A custom hook to fetch data from a URL.
 *
 * @param {string} url The URL to fetch data from.
 * @returns {{data: any, loading: boolean, error: Error|null}}
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController is used to cancel the request on component unmount
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, {
          signal: controller.signal, // Pass the signal to axios
        });
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;