import { useState,} from "react";

export const useGetData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

    const fetchData = async (url,location='Bengaluru',days=null) => {
      try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}?q=${location}${days?`&days=${days}`:""}&key=${process.env.REACT_APP_API_KEY}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                }
            }
          );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message);
        }

        setData(data);
      } catch (error) {
        setIsError(true);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  return { data, loading, error, isError, fetchData };
};
