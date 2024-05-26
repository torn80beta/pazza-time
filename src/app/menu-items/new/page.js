"use client";

import { useProfile } from "../../hooks/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useState } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItem() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  const isAdmin = profileData?.admin;
  const [redirectToMenu, setRedirectToMenu] = useState(false);
  // const isAdmin = false;

  async function handleFormSubmit(e, data) {
    e.preventDefault();

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
    return <div className="text-center">Loading...</div>;
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
          <div className="max-w-xl mx-auto mt-8">
            <Link className="button" href="/menu-items">
              <Left />
              <span> Back to menu</span>
            </Link>
          </div>

          <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
        </>
      )}
    </section>
  );
}
