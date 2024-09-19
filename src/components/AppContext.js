"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;

  if (cartProduct.size?.price) {
    price += cartProduct.size.price;
  }

  if (cartProduct.extras?.length > 0) {
    price += cartProduct.extras.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  }

  return price;
}

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
      const updatedCart = prevProducts.filter(
        (product) => product.cartProductID !== id
      );
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
    const cartProductID = nanoid();
    setCartProducts((prevProducts) => {
      const productToAdd = { ...product, size, extras, cartProductID };
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
