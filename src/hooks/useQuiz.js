// hooks/useQuizApi.js
import { useState, useEffect } from "react";
import { routes } from "../utilis/apiRoutes";

const useQuizApi = (endpoint, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const route = routes[endpoint];

        if (!route) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const url = `http://localhost:5000${route}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useQuizApi;
