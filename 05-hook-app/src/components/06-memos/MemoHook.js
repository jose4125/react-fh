import { useMemo, useState } from "react";
import { useCounter } from "../../hooks/useCounter";
import { Small } from "./Small";
import { procesoPesado } from "../../helpers/procesoPesado";

export const MemoHook = () => {
  const { counter, increment } = useCounter(1000);

  const [show, setShow] = useState(true);

  const memoProcesoPesado = useMemo(() => procesoPesado(counter), [counter]);

  return (
    <div>
      <h1>memohook - useMemo</h1>
      <h3>
        count: <Small value={counter} />
      </h3>
      <hr />
      <p>{memoProcesoPesado}</p>
      <button onClick={() => increment(1)}>+1</button>
      <button onClick={() => setShow(!show)}>
        show/hide {JSON.stringify(show)}
      </button>
    </div>
  );
};
