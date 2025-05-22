"use client";

import { useCallback, useState } from "react";

export function Counter() {
  const [counter, setCounter] = useState(0);

  const incrementHandler = useCallback(() => {
    setCounter((counter) => counter + 1);
  }, []);

  return (
    <>
      {counter}
      <button onClick={incrementHandler}>Increment</button>
    </>
  );
}
