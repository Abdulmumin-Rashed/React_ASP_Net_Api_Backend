import { useState, useEffect } from "react";
import config from "../../config.json";
import http from "../../services/httpService";

const moviesEndPoint = config.apiUrl + "/Movies";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    http
      .get(moviesEndPoint, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not find resource with id ");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Clean up");
        } else {
          setError(err.message);
          setIsPending(false);
        }
      });
    return () => abortCont.abort();
  }, [moviesEndPoint]);
  return { data, isPending, error };
};

export default useFetch;
