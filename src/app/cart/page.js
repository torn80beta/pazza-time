"use client";

import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import { useSession } from "next-auth/react";
import { useProfile } from "@/app/hooks/UseProfile";

export default function CartPage() {
  const { status } = useSession();
  const { data: profileData } = useProfile();
  // const [user, setUser] = useState(null);
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const { cartProducts, removeProductFromCart } = useContext(CartContext);
  const [deliveryAddress, setDeliveryAddress] = useState({
    phone: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + cartProductPrice(product),
    0
  );

  useEffect(() => {
    if (status === "authenticated") {
      setIsProfileFetched(true);
      if (profileData.streetAddress) {
        const { streetAddress, phone, city, postalCode, country } = profileData;
        setDeliveryAddress({
          streetAddress,
          phone,
          city,
          postalCode,
          country,
        });
      }
    }
  }, [status, profileData]);

  /* In case we want to grab address from context user object */

  // useEffect(() => {
  //   if (status === "authenticated" && !user) {
  //     fetch("/api/profile", {
  //       method: "GET",
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setUser(data);
  //         setIsProfileFetched(true);
  //       });
  //   }
  // }, [status, user]);

  // useEffect(() => {
  //   if (status === "authenticated" && user) {
  //     setDeliveryAddress({
  //       phone: user?.phone || "",
  //       streetAddress: user?.streetAddress || "",
  //       city: user?.city || "",
  //       postalCode: user?.postalCode || "",
  //       country: user?.country || "",
  //     });
  //   }
  // }, [user, status]);

  function handleAddressChange(propName, value) {
    setDeliveryAddress((prevAddress) => {
      return { ...prevAddress, [propName]: value };
    });
  }

  /*  */
  if (status === "loading" || !isProfileFetched) {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }
  /*  */

  return (
    // console.log(user),
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          {cartProducts.length === 0 && (
            <div>There is no products in your shopping cart</div>
          )}
          {cartProducts.length > 0 &&
            cartProducts.map((product, index) => (
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
                        <div className="text-sm text-gray-500" key={extra.name}>
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
                    onClick={() => removeProductFromCart(product.cartProductID)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">${totalPrice}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="">Checkout</h2>
          <form>
            {/* <label htmlFor="address">Address</label> */}
            <AddressInputs
              addressProps={{ ...deliveryAddress }}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${totalPrice}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
