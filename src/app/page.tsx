import Link from "next/link";

export default function Home() {
  return (
    <div>
      Hello
      <Link href={'/counter'}>Counter</Link>
    </div>
  );
}
