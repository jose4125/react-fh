import { useState } from "react";

export const useCounter = (init = 10) => {
  const [counter, setCounter] = useState(init);

  const increment = (factor = 1) => {
    setCounter(counter + factor);
  };

  const decrement = (factor = 1) => {
    setCounter(counter - factor);
  };

  const reset = () => {
    setCounter(init);
  };

  return {
    counter,
    decrement,
    increment,
    reset,
  };
};
