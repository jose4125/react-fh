import { useRef } from "react";

export const FocusScreen = () => {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.select();
  };

  return (
    <div>
      <h1>Focus screen</h1>
      <hr />
      <input ref={inputRef} type="text" placeholder="name" />
      <button onClick={handleClick}>focus</button>
    </div>
  );
};
