import PropTypes from "prop-types";
import GifGridItem from "./GifGridItem";
import { useFetchGifs } from "../hooks/useFetchGifs";

export default function GifGrid({ category }) {
  const [images, loading] = useFetchGifs(category);

  return (
    <>
      <h3>{category}</h3>
      {loading && <p>Loading...</p>}
      <div className="card-grid">
        {images && images.map((img) => <GifGridItem key={img.id} {...img} />)}
      </div>
    </>
  );
}

GifGrid.propTypes = {
  category: PropTypes.string.isRequired,
};
