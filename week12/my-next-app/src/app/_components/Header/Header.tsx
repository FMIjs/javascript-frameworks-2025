import Link from "next/link";

export function Header() {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/todos">Todos</Link>
      <Link href="/about">About</Link>
    </header>
  );
}
