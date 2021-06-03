import { memo } from "react";

export const ShowIncrement = memo(({ handleIncrement }) => {
  console.log("me volvi a generar :(");
  return <button onClick={() => handleIncrement(5)}>increment</button>;
});
