import { nanoid } from "nanoid";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";

export default function MenuItemPriceProps({ sizes, setSizes }) {
  function addSize() {
    setSizes((oldSizes) => [...oldSizes, { name: "", price: 0 }]);
  }

  function editSize(e, index, prop) {
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = e.target.value;
      return newSizes;
    });
  }

  function removeSize(index) {
    setSizes((prevSizes) => prevSizes.filter((_, i) => i !== index));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <label>Sizes</label>
      {sizes?.length > 0 &&
        sizes.map((size, index) => (
          <div className="flex gap-2 items-end" key={nanoid}>
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
            <div>
              <button
                className="mb-2 bg-white px-2"
                type="button"
                onClick={() => removeSize(index)}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      <button onClick={addSize} className="bg-white items-center" type="button">
        <Plus className="w-4 h-4" />
        <span>Add size</span>
      </button>
    </div>
  );
}
