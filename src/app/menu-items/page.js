"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../hooks/UseProfile";
import { redirect } from "next/navigation";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  const isAdmin = profileData?.admin;

  useEffect(() => {
    // const response = await
    fetch("/api/menu-items", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((menuItems) => setMenuItems(menuItems))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isProfileLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin && !isProfileLoading) {
    // return <div></div>;
    return redirect("/");
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <h2 className="text-3xl text-center mb-8">Menu items page</h2>
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <Link className="button flex" href="/menu-items/new">
          Add new item
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-grey-500 mt-8">Edit menu item:</h2>
        {menuItems?.length > 0 &&
          menuItems.map((item) => (
            <>
              <Link
                href={`/menu-items/edit/${item._id}`}
                className="button mb-1"
                key={item._id}
              >
                {/* <div className="relative"> */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                {/* </div> */}
                {item.name}
              </Link>
            </>
          ))}
      </div>
    </section>
  );
}
