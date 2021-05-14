import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);

  const handleInputChange = ({ target }) => {
    const key = target.name;
    const value = target.value;
    setFormState({ ...formState, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return {
    formState,
    handleInputChange,
    handleSubmit,
  };
};
