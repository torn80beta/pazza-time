"use client";

import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";

export default function CartPage() {
  const { cartProducts, removeProductFromCart } = useContext(CartContext);
  // const { address, setAddress } = useState({});

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + cartProductPrice(product),
    0
  );

  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  function handleAddressChange(propName, value) {
    if (propName === "phone") {
      setPhone(value);
    }

    if (propName === "streetAddress") {
      setStreetAddress(value);
    }

    if (propName === "postalCode") {
      setPostalCode(value);
    }

    if (propName === "city") {
      setCity(value);
    }

    if (propName === "country") {
      setCountry(value);
    }
  }

  // function handleAddressChange(propName, value) {
  //   setAddress((prevAddress) => {
  //     return { ...prevAddress, [propName]: value };
  //   });
  // }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          {cartProducts.length === 0 && (
            <div>There is no products in your shopping cart</div>
          )}
          {cartProducts.length > 0 &&
            cartProducts.map(
              (product, index) => (
                console.log(product),
                (
                  <div
                    className="flex gap-4 border-b py-4 items-center"
                    key={product.cartProductID}
                  >
                    <div className="min-w-[12dvw] max-w-[12dvw]">
                      <Image
                        className="rounded-xl"
                        src={product.image}
                        alt={product.name}
                        width={240}
                        height={240}
                      />
                    </div>

                    <div className="grow">
                      <h3 className="font-semibold">
                        {product.size?.name && product.size.name + " "}
                        {product.name}
                      </h3>
                      {product.size && (
                        <div className="text-sm ">
                          Size: <span>{product.size.name}</span>
                        </div>
                      )}
                      {product.extras?.length > 0 && (
                        <div>
                          {product.extras.map((extra) => (
                            <div
                              className="text-sm text-gray-500"
                              key={extra.name}
                            >
                              {extra.name} ${extra.price}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-lg font-semibold">
                      ${cartProductPrice(product)}
                    </div>
                    <div className="ml-2">
                      <button
                        type="button"
                        onClick={() =>
                          removeProductFromCart(product.cartProductID)
                        }
                        className="p-2"
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">${totalPrice}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="">Checkout</h2>
          <form>
            {/* <label htmlFor="address">Address</label> */}
            <AddressInputs
              addressProps={{ phone, streetAddress, city, postalCode, country }}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${totalPrice}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
