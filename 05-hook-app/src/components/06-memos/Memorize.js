import { useState } from "react";
import { useCounter } from "../../hooks/useCounter";
import { Small } from "./Small";

export const Memorize = () => {
  const { counter, increment } = useCounter(10);

  const [show, setShow] = useState(true);

  return (
    <div>
      <h1>memo</h1>
      <h3>
        count: <Small value={counter} />
      </h3>
      <hr />
      <button onClick={() => increment(1)}>+1</button>
      <button onClick={() => setShow(!show)}>
        show/hide {JSON.stringify(show)}
      </button>
    </div>
  );
};
