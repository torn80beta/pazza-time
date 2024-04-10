"use client";
import { SessionProvider } from "next-auth/react";

export function AppContext({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
