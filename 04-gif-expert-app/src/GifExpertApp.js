import { useState } from "react";
import AddCategory from "./components/AddCategory";
import GifGrid from "./components/GifGrid";

export default function GifExpertApp({ defaultCategories = [] }) {
  const [categories, setCategory] = useState(defaultCategories);

  const handleAddCategory = (category) => {
    setCategory([category, ...categories]);
  };

  return (
    <>
      <h2>gif expert app</h2>
      <AddCategory onAddCategory={handleAddCategory} />
      <hr />
      {categories.map((category) => {
        return <GifGrid key={category} category={category} />;
      })}
    </>
  );
}
