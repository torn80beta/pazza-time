"use client";

import { useProfile } from "../../hooks/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";

export default function NewMenuItem() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const isAdmin = profileData?.admin;
  const [redirectToMenu, setRedirectToMenu] = useState(false);
  // const isAdmin = false;

  async function handleFormSubmit(e) {
    e.preventDefault();
    const data = {
      image,
      name,
      description,
      basePrice,
    };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        resolve();
      } else {
        reject({ error: "Failed to create new menu item" });
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Item saved!",
      error: "Failed to save!",
    });

    setRedirectToMenu(true);
  }

  if (redirectToMenu) {
    redirect("/menu-items");
  }

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
          <div className="max-w-md mx-auto mt-8">
            <Link className="button" href="/menu-items">
              <Left />
              <span> Back to menu</span>
            </Link>
          </div>
          <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
            <div
              className="grid items-start gap-4"
              style={{ gridTemplateColumns: ".3fr .7fr" }}
            >
              <div className="">
                {/* <div className="flex flex-col p-2 rounded-lg min-w-24 max-w-[120px]"> */}
                <EditableImage
                  link={image}
                  setLink={setImage}
                  variant={"image"}
                />
              </div>
              {/* <EditableImage link={image} setLink={setImage} /> */}
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
                <label>Base price</label>
                <input
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  type="text"
                />

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
