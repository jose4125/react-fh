import { useState, useEffect } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const gifs = await getGifs(category);
      setImages(gifs);
      setLoading(false);
    };

    loadData();
  }, [category]);

  return [images, loading];
};
