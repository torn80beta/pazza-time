import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || 0);
  const [sizes, setSizes] = useState([]);

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

          <MenuItemPriceProps {...{ sizes, setSizes }} />

          <button className="" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
