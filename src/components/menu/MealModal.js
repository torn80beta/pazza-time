import Image from "next/image";
import { useState } from "react";

export default function MealModal({ item, setShowPopup, onAddToCart }) {
  const { image, name, description, basePrice, sizes, extras } = item;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  function handleExtraClick(e, extra) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prevExtras) => [...prevExtras, extra]);
    } else {
      setSelectedExtras((prevExtras) =>
        prevExtras.filter((item) => item.name !== extra.name)
      );
    }
  }

  let selectedPrice = basePrice;

  if (selectedSize) {
    // console.log(selectedSize);
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras.length > 0) {
    // console.log(selectedExtras);
    selectedPrice += selectedExtras.reduce((acc, item) => acc + item.price, 0);
  }

  return (
    // console.log(item),
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowPopup(false);
        }
      }}
    >
      <div className="flex flex-col gap-4 max-w-md items-center overflow-y-scroll no-scrollbar max-h-[calc(100vh-(100vh-95%))] bg-white p-8 rounded-lg">
        <Image
          className="rounded-lg"
          src={image}
          alt={name}
          width={300}
          height={300}
        />
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-center text-gray-500 text-sm mb-2">{description}</p>

        {/* <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
        <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
        <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
        <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
        <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
        <p className="text-center text-gray-500 text-sm mb-2">{description}</p> */}

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
                  <input
                    type="radio"
                    name="size"
                    onChange={() => setSelectedSize(size)}
                    checked={selectedSize?.name === size.name}
                  />
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
              {/* {JSON.stringify(selectedExtras)}, */}
              {extras.map((extra, index) => (
                <label
                  className="flex items-center gap-2 rounded-md p-1"
                  key={index}
                >
                  <input
                    type="checkbox"
                    name={extra}
                    onChange={(e) => handleExtraClick(e, extra)}
                  />
                  {extra.name} +{extra.price}$
                </label>
              ))}
            </div>
          )}
        </div>
        <button
          className="primary sticky bottom-1"
          type="button"
          onClick={() => onAddToCart(selectedSize, selectedExtras)}
          // onClick={() => onAddToCart(item, selectedSize, selectedExtras)}
        >
          Add to cart
          {` ${selectedPrice}$`}
        </button>
        <button
          className="-mt-2"
          type="button"
          onClick={() => setShowPopup(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
