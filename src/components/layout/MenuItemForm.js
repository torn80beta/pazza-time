import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || 0);
  const [sizes, setSizes] = useState([]);

  function addSize() {
    setSizes((oldSizes) => [...oldSizes, { name: "", price: 0 }]);
  }

  function editSize(e, index, prop) {
    const newValue = e.target.value;
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  return (
    <form
      className="mt-8 max-w-md mx-auto"
      onSubmit={(e) => onSubmit(e, { image, name, description, basePrice })}
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="">
          {/* <div className="flex flex-col p-2 rounded-lg min-w-24 max-w-[120px]"> */}
          <EditableImage link={image} setLink={setImage} variant={"image"} />
        </div>
        {/* <EditableImage link={image} setLink={setImage} /> */}
        <div className="grow">
          <label>Item name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
          <label>Base price</label>
          <input
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            type="text"
          />
          <div className="bg-gray-200 p-2 rounded-md mb-2">
            <label>Sizes</label>
            {sizes?.length > 0 &&
              sizes.map((size, index) => (
                <div className="flex gap-2" key={size.name}>
                  <div>
                    <label>Size name</label>
                    <input
                      type="text"
                      placeholder="Size name"
                      value={size.name}
                      onChange={(e) => editSize(e, index, "name")}
                    />
                  </div>

                  <div>
                    <label>Extra price</label>
                    <input
                      type="text"
                      placeholder="Extra price"
                      value={size.price}
                      onChange={(e) => editSize(e, index, "price")}
                    />
                  </div>
                </div>
              ))}
            <button onClick={addSize} className="bg-white" type="button">
              Add size
            </button>
          </div>

          <button className="" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
