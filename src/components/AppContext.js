"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export function AppContext({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (localStorage && localStorage.getItem("cartProducts")) {
      setCartProducts(JSON.parse(localStorage.getItem("cartProducts")));
    }
  }, [localStorage]);

  function saveCartToLocalStorage(cart) {
    if (localStorage) {
      localStorage.setItem("cartProducts", JSON.stringify(cart));
    }
  }

  function removeProductFromCart(id) {
    setCartProducts((prevProducts) => {
      const updatedCart = prevProducts.filter((product) => product._id !== id);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  }

  function clearCart() {
    setCartProducts([]);
    saveCartToLocalStorage([]);
  }

  function addToCart(product, size = {}, extras = []) {
    console.log("product ", product);
    console.log("size ", size);
    console.log("extras ", extras);
    setCartProducts((prevProducts) => {
      const productToAdd = { ...product, size, extras };
      // console.log(productToAdd);
      const updatedCart = [...prevProducts, productToAdd];
      saveCartToLocalStorage(updatedCart);
      // console.log(updatedCart);
      return updatedCart;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          clearCart,
          removeProductFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
