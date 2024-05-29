"use client";

import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect, useState } from "react";
import MenuItem from "@/components/menu/MenuItem";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        // console.log(categories);
        setCategories(categories);
      });
    });

    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        // console.log(menuItems);
        setMenuItems(menuItems);
      });
    });
  }, []);

  return (
    <section className="mt-8">
      {categories.length > 0 &&
        categories.map((category) => {
          return (
            <div key={category._id}>
              <div className="text-center">
                <SectionHeaders mainHeader={category.name} />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
                {menuItems
                  .filter((item) => item.category === category._id)
                  .map((item) => (
                    <div className="" key={item._id}>
                      <MenuItem item={item} />
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
    </section>
  );
}
