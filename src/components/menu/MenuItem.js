import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast";

export default function MenuItem({ item }) {
  const { image, name, description, basePrice, sizes, extras } = item;
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  function handleAddToCart() {
    if (sizes.length === 0 && extras.length === 0) {
      addToCart(item);
      toast.success("Added to cart");
    } else {
      setShowPopup(true);
    }
  }

  return (
    // console.log(item),
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20">
          <div className="flex flex-col gap-4 max-w-md items-center overflow-y-scroll no-scrollbar max-h-[calc(100vh-(100vh-95%))] bg-white p-8 rounded-lg">
            <Image
              className="rounded-lg"
              src={image}
              alt={name}
              width={300}
              height={300}
            />
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>

            <div className="flex gap-2">
              {sizes.length > 0 && (
                <div className="p-2">
                  <h3 className="text-lg text-center text-gray-700 font-bold">
                    Size
                  </h3>
                  {sizes.map((size, index) => (
                    <label
                      className="flex items-center gap-2 rounded-md p-1"
                      key={index}
                    >
                      <input type="radio" name="size" />
                      {size.name} {basePrice + size.price}$
                    </label>
                  ))}
                </div>
              )}

              {extras.length > 0 && (
                <div className="p-2">
                  <h3 className="text-lg text-center text-gray-700 font-bold">
                    Extra Ingredients
                  </h3>
                  {extras.map((extra, index) => (
                    <label
                      className="flex items-center gap-2 rounded-md p-1"
                      key={index}
                    >
                      <input type="checkbox" name={extra} />
                      {extra.name} +{extra.price}$
                    </label>
                  ))}
                </div>
              )}
            </div>
            <button className="primary" type="button">
              Add to cart
            </button>
            <button
              className="flex items-center text-black bg-gray-200 px-4 py-2 w-24 h-8"
              type="button"
              onClick={() => setShowPopup(false)}
            >
              close
            </button>
          </div>
        </div>
      )}
      <div className="bg-gray-100 py-6 px-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all">
        <div className="group text-center">
          <Image
            className="h-auto w-auto max-h-36 block mx-auto rounded-md"
            src={image}
            alt="pizza"
            width={144}
            height={144}
          />

          {/* Popup image start */}
          <div
            className="
        bg-gray-300 bg-opacity-50 rounded-md p-6
        opacity-0 fixed top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 transition duration-500 z-10 invisible group-hover:visible delay-100 scale-0 group-hover:scale-125 group-hover:opacity-100"
          >
            <Image
              className="rounded-xl"
              src={image}
              alt="pizza"
              width={300}
              height={300}
            />
          </div>
          {/* Popup image end */}
        </div>

        <h4 className="font-semibold text-xl my-3">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <button
          type="button"
          className="mt-4 bg-primary rounded-full text-white px-8 py-2"
          onClick={handleAddToCart}
        >
          Add to cart ${basePrice}
        </button>
      </div>
    </>
  );
}
