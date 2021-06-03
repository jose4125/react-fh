import PropTypes from "prop-types";

export default function GifGridItem({ title, url }) {
  return (
    <div className="card animate__animated animate__fadeIn">
      <img src={url} alt={title} />
      <h2>{title}</h2>
    </div>
  );
}

GifGridItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
