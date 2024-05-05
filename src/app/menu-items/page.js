"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../hooks/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function MenuItemsPage() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  const [image, setImage] = useState("");
  const isAdmin = profileData?.admin;

  if (isProfileLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin && !isProfileLoading) {
    // return <div></div>;
    return redirect("/");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      {isAdmin && (
        <>
          <form className="mt-8 max-w-md mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex flex-col p-2 rounded-lg min-w-24 max-w-[120px]">
                <EditableImage
                  link={image}
                  setLink={setImage}
                  variant={"image"}
                />
              </div>
              {/* <EditableImage link={image} setLink={setImage} /> */}
              <div className="grow">
                <label>Item name</label>
                <input type="text" />
                <label>Description</label>
                <input type="text" />
                <label>Base price</label>
                <input type="text" />

                <button className="" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
