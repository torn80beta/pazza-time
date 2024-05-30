import Image from "next/image";
import { useState } from "react";

export default function MealModal({ item, setShowPopup }) {
  const { image, name, description, basePrice, sizes, extras } = item;
  const [selectedSize, setSelectedSize] = useState(null);
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

  return (
    // console.log(selectedExtras),
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
        <p className="text-center text-gray-500 text-sm mb-2">{description}</p>

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
  );
}