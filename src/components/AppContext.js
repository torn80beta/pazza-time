"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

const CartContext = createContext({});

export function AppContext({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <SessionProvider>
      <CartContext.Provider value={{ cartProducts, setCartProducts }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
