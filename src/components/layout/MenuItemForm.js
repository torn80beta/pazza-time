import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import DeleteButton from "../DeleteButton";

export default function MenuItemForm({ onSubmit, menuItem, onDelete }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [category, setCategory] = useState(menuItem?.category || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || 0);
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extras, setExtras] = useState(menuItem?.extras || []);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((cats) => {
        setCategories(cats);
      });
    });
  }, []);

  return (
    <form
      className="mt-8 max-w-xl mx-auto"
      onSubmit={(e) =>
        onSubmit(e, {
          image,
          name,
          description,
          category,
          basePrice,
          sizes,
          extras,
        })
      }
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="">
          {/* <div className="flex flex-col p-2 rounded-lg min-w-24 max-w-[120px]"> */}
          <EditableImage link={image} setLink={setImage} variant={"image"} />
        </div>

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

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>

          <label>Base price</label>
          <input
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            type="text"
          />

          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add Size"}
            props={sizes}
            setProps={setSizes}
          />

          <MenuItemPriceProps
            name={"Extra Ingredients"}
            addLabel={"Add Ingredient"}
            props={extras}
            setProps={setExtras}
          />

          <button className="" type="submit">
            Save
          </button>

          <div className="max-w-md mx-auto mt-2">
            <DeleteButton label={"Delete"} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </form>
  );
}
