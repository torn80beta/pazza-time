export default function MenuItem() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all">
      <div className="text-center">
        <img
          className="h-auto w-auto max-h-24 block mx-auto"
          src="/pizza.png"
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </p>
      <button className="mt-4 bg-primary rounded-full text-white px-8 py-2">
        Add to cart $12
      </button>
    </div>
  );
}
