import { nanoid } from "nanoid";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  function addProps() {
    setProps((oldProps) => [...oldProps, { name: "", price: 0 }]);
  }

  function editProps(e, index, prop) {
    setProps((prevProps) => {
      const newProps = [...prevProps];
      newProps[index][prop] = e.target.value;
      return newProps;
    });
  }

  function removeProps(index) {
    setProps((prevProps) => prevProps.filter((_, i) => i !== index));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <label>{name}</label>
      {props?.length > 0 &&
        props.map((size, index) => (
          <div className="flex gap-2 items-end" key={nanoid}>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Add name"
                value={size.name}
                onChange={(e) => editProps(e, index, "name")}
              />
            </div>

            <div>
              <label>Extra price</label>
              <input
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={(e) => editProps(e, index, "price")}
              />
            </div>
            <div>
              <button
                className="mb-2 bg-white px-2"
                type="button"
                onClick={() => removeProps(index)}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      <button
        onClick={addProps}
        className="bg-white items-center"
        type="button"
      >
        <Plus className="w-4 h-4" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}
