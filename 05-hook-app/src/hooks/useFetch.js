import { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {
  const isMounted = useRef(true);
  const [state, setState] = useState({
    data: null,
    loading: true,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(
    () => {
      setState({
        data: null,
        loading: true,
      });

      const LoadData = async (url) => {
        try {
          const res = await fetch(url);
          const data = await res.json();

          if (isMounted.current) {
            setState({ data, loading: false });
          }
        } catch (error) {
          setState({ data: null, loading: false });
          setError("no se pudo cargar la data");
        }
      };
      LoadData(url);
    },
    [url]
  );

  return { state, error };
};
