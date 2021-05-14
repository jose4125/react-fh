import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    setState({
      data: null,
      loading: true,
    });

    const LoadData = async (url) => {
      const res = await fetch(url);
      const data = await res.json();

      setState({ data, loading: false });
    };
    LoadData(url);
  }, [url]);

  return { state, error };
};
