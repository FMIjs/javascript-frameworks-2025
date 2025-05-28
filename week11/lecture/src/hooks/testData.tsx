import { useCallback, useEffect, useState } from "react";

let mod = 0;
let setStateHandlers: React.Dispatch<React.SetStateAction<number | null>>[] = []
const staticStateChangeHandler = (newState: number | null) => {
  setStateHandlers.forEach((handler) => handler(newState))
}

type TestDataProps = {
  id: string;
}
export const useTestData = ({ id }: TestDataProps) => {
  const [state, setState] = useState<number | null>(null);

  useEffect(() => {
    console.log(`useTestData (${id}) initialized`, mod);
    setStateHandlers.push(setState);
    mod++;
    return () => {
      console.log(`useTestData (${id}) unmounted`);
      setStateHandlers = setStateHandlers.filter((handler) => handler !== setState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const stateChangeHandler = useCallback(staticStateChangeHandler, [])
  useEffect(() => console.log(id), [id]);

  return { state, setState: stateChangeHandler };
}
