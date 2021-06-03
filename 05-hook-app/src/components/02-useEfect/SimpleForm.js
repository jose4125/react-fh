import React, { useEffect, useState } from "react";

export const SimpleForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
  });

  const { name, email } = formState;

  useEffect(() => {
    console.log("hey");
  }, []);

  useEffect(() => {
    console.log("formState");
  }, [formState]);

  useEffect(() => {
    console.log("email");
  }, [email]);

  const handleInputChange = ({ target }) => {
    const key = target.name;
    const value = target.value;
    setFormState({ ...formState, [key]: value });
  };

  return (
    <>
      <h1>Simple Form</h1>
      <hr />
      <form>
        <input
          type="text"
          name="name"
          placeholder="tu nombre"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="test@tessst.com"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
      </form>
    </>
  );
};
