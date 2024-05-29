"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const CartContext = createContext({});

export function AppContext({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const productToAdd = { ...product, size, extras };
      const updatedCart = [...prevProducts, productToAdd];
      console.log(updatedCart);
      return updatedCart;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{ cartProducts, setCartProducts, addToCart }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
