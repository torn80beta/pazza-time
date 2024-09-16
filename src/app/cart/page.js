"use client";

import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext } from "react";
import { CartContext } from "@/components/AppContext";
import Image from "next/image";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);

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
            cartProducts.map((product) => (
              <div
                className="flex gap-4 border-b py-4 items-center"
                key={product._id}
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                  />
                </div>
                <div>
                  <h3>{product.name}</h3>
                  {product.size && (
                    <div>
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div>
                      Extars:
                      {product.extras.map((extra) => (
                        <div className="" key={extra.name}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div>right</div>
      </div>
    </section>
  );
}
