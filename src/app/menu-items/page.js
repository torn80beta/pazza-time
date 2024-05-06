"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../hooks/UseProfile";
// import EditableImage from "@/components/layout/EditableImage";
// import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Right from "@/components/icons/Right";
// import { toast } from "react-hot-toast";

export default function MenuItemsPage() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  // const [image, setImage] = useState("");
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [basePrice, setBasePrice] = useState(0);
  const isAdmin = profileData?.admin;

  // async function handleFormSubmit(e) {
  //   e.preventDefault();
  //   const data = {
  //     image,
  //     name,
  //     description,
  //     basePrice,
  //   };
  //   const savingPromise = new Promise(async (resolve, reject) => {
  //     const response = await fetch("/api/menu-items", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       resolve();
  //     } else {
  //       reject({ error: "Failed to create new menu item" });
  //     }
  //   });

  //   await toast.promise(savingPromise, {
  //     loading: "Saving...",
  //     success: "Item saved!",
  //     error: "Failed to save!",
  //   });
  // }

  if (isProfileLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin && !isProfileLoading) {
    // return <div></div>;
    return redirect("/");
  }

  return (
    <section className="mt-8">
      <h2 className="text-3xl text-center mb-8">Menu items page</h2>
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <Link className="button flex" href="/menu-items/new">
          Add new item
          <Right />
        </Link>
      </div>
    </section>
    // <section className="mt-8">
    //   <UserTabs isAdmin={isAdmin} />
    //   {isAdmin && (
    //     <>
    //       <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
    //         <div
    //           className="grid items-start gap-4"
    //           style={{ gridTemplateColumns: ".3fr .7fr" }}
    //         >
    //           <div className="">
    //             {/* <div className="flex flex-col p-2 rounded-lg min-w-24 max-w-[120px]"> */}
    //             <EditableImage
    //               link={image}
    //               setLink={setImage}
    //               variant={"image"}
    //             />
    //           </div>
    //           {/* <EditableImage link={image} setLink={setImage} /> */}
    //           <div className="grow">
    //             <label>Item name</label>
    //             <input
    //               value={name}
    //               onChange={(e) => setName(e.target.value)}
    //               type="text"
    //             />
    //             <label>Description</label>
    //             <input
    //               value={description}
    //               onChange={(e) => setDescription(e.target.value)}
    //               type="text"
    //             />
    //             <label>Base price</label>
    //             <input
    //               value={basePrice}
    //               onChange={(e) => setBasePrice(e.target.value)}
    //               type="text"
    //             />

    //             <button className="" type="submit">
    //               Save
    //             </button>
    //           </div>
    //         </div>
    //       </form>
    //     </>
    //   )}
    // </section>
  );
}
