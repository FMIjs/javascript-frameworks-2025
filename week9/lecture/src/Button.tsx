import { PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{
  title: string;
  count?: number;
  clickHandler: () => void;
}>;

export function Button(props: ButtonProps) {
  const { title, count, clickHandler, children } = props;

  return (
    <button onClick={clickHandler}>
      <span>{title}</span>
      {count !== undefined && <span>{count}</span>}
    </button>
  );
}
