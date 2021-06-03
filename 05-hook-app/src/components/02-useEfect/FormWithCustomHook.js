import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

export const FormWithCustomHooks = () => {
  const { formState, handleInputChange, handleSubmit } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formState;

  useEffect(() => {
    console.log("email change");
  }, [email]);

  return (
    <>
      <h1>form with custom hooks</h1>
      <hr />
      <form onSubmit={handleSubmit}>
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
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
