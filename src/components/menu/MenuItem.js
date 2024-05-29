import Image from "next/image";

export default function MenuItem({ item }) {
  const { image, name, description, basePrice, sizes, extras } = item;

  return (
    // console.log(item),
    <div className="bg-gray-100 py-6 px-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/30 transition-all">
      <div className="group text-center">
        <Image
          className="h-auto w-auto max-h-40 block mx-auto rounded-md"
          // src="/pizza.png"
          src={image}
          alt="pizza"
          width={150}
          height={150}
        />

        {/* Popup image*/}
        <div
          className="
        bg-gray-300 bg-opacity-50 rounded-md p-6
        opacity-0 absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 transition duration-500 z-10 invisible group-hover:visible delay-100 scale-0 group-hover:scale-125 group-hover:opacity-100"
        >
          <Image
            className="rounded-xl"
            src={image}
            alt="pizza"
            width={300}
            height={300}
          />
        </div>
        {/*  */}
      </div>

      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <button className="mt-4 bg-primary rounded-full text-white px-8 py-2">
        Add to cart ${basePrice}
      </button>
    </div>
  );
}
