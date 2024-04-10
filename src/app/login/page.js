"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
// import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    // setError(false);
    // const { ok } = await fetch("/api/login", {
    //   method: "POST",
    //   body: JSON.stringify({ email, password }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // if (ok) {
    //   // setError(false);
    // } else {
    //   // setError(true);
    // }

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form
        className="block max-w-xs mx-auto"
        action=""
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(e) => setPassword(e.target.value.trim())}
        />

        <button type="submit" disabled={loginInProgress}>
          Login
        </button>

        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>

        <button
          type="button"
          className="flex gap-4 justify-center"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src="/google.png" width={24} height={24} alt="google" />
          Login with Google
        </button>
      </form>
    </section>
  );
}
