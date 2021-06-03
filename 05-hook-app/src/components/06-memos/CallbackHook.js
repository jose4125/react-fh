import { useCallback, useState } from "react";
import { ShowIncrement } from "./ShowIncrement";

export const CallbackHook = () => {
  const [counter, setCounter] = useState(10);

  const increment = useCallback(
    (factor) => {
      setCounter((c) => c + factor);
    },
    [setCounter]
  );

  return (
    <div>
      <h1>callback hook - useCallback</h1>
      <h3>counter: {counter}</h3>
      <hr />
      <ShowIncrement handleIncrement={increment} />
    </div>
  );
};
