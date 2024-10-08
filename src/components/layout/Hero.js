import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4 flex justify-center">
      <div className="py-12">
        <h1 className="text-4xl text-semibold">
          Everything
          <br />
          is better
          <br />
          with a&nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-4 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex items-center justify-center gap-2 bg-primary uppercase rounded-full text-white px-4 py-2">
            Order Now
            <Right />
          </button>
          <button className="flex items-center border-none gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div
        // className="relative"
        className="flex items-center justify-center"
      >
        <Image
          src="/pizza.png"
          alt="pizza"
          width={512}
          height={512}
          // objectFit="contain"
          // layout="fill"
          priority={true}
          style={{ height: "auto" }}
        />
        {/* <Image src="/pizza.png" alt="pizza" layout="fill" objectFit="contain" /> */}
      </div>
    </section>
  );
}
