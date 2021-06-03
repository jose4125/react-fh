import { useState } from "react";
import PropTypes from "prop-types";

export default function AddCategory({ onAddCategory }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onAddCategory(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Add category</button>
    </form>
  );
}

AddCategory.propTypes = {
  onAddCategory: PropTypes.func.isRequired,
};
