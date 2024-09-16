"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";

export default function Header() {
  const session = useSession();
  const { status } = session;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  // console.log(userData);

  return (
    <header className="flex justify-between items-center">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="/">
          PIZZA TIME
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={"/#contact"}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link className="whitespace-nowrap" href={"/profile"}>
              Hello, {userName}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              className="bg-primary rounded-full text-white px-8 py-2"
              href={"/register"}
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              className="bg-primary rounded-full text-white px-8 py-2"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}

        <Link href={"/cart"} className="relative">
          <ShoppingCart />
          <span className="absolute -top-2 -right-3 bg-primary text-white text-xs p-1 rounded-full leading-none">
            {cartProducts.length}
          </span>
        </Link>
      </nav>
    </header>
  );
}
