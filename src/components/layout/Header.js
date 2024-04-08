import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Link className="text-primary font-semibold text-2xl" href="">
        PIZZA TIME
      </Link>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href={""}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
        <Link
          className="bg-primary rounded-full text-white px-8 py-2"
          href={""}
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
