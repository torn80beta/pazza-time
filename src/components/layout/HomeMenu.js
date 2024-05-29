"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        const itemsToShow = menuItems.slice(-3);
        setBestSellers(itemsToShow);
        // console.log(itemsToShow);
      });
    });
  }, []);

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full">
        <div className="absolute left-0 -top-[70px] -z-10">
          <Image src="/salad1.png" alt="pizza" width={109} height={189} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src="/salad2.png" alt="pizza" width={107} height={195} />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders subHeader={"check out"} mainHeader={"Best Sellers"} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {bestSellers.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} item={item} />)}
      </div>
    </section>
  );
}
