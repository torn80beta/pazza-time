"use client";

import Link from "next/link";
import UserTabs from "@/components/layout/UserTabs";
import Left from "@/components/icons/Left";
import { useProfile } from "../../../hooks/UseProfile";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function EditMenuItemPage() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const isAdmin = profileData?.admin;
  const [redirectToMenu, setRedirectToMenu] = useState(false);
  // const isAdmin = false;
  const { id } = useParams();

  useEffect(() => {
    if (isAdmin) {
      fetch(`/api/menu-items/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setMenuItem(data);
        });
    }
  }, [id, isAdmin]);

  async function handleFormSubmit(e, data) {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify({ ...data, _id: id }),
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

  async function handleDeleteMenuItem() {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch(`/api/menu-items`, {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        resolve();
      } else {
        reject({ error: "Operation failed" });
      }
    });

    await toast.promise(deletingPromise, {
      loading: "Deleting...",
      success: "Item deleted!",
      error: "Failed to delete!",
    });

    setRedirectToMenu(true);
  }

  if (redirectToMenu) {
    redirect("/menu-items");
  }

  // if (isProfileLoading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  if (!isAdmin && !isProfileLoading) {
    // return <div></div>;
    return redirect("/");
  }

  return (
    <section className="mt-8">
      {(!isProfileLoading && (
        <>
          <UserTabs isAdmin={isAdmin} />
          <div className="max-w-md mx-auto mt-8">
            <Link className="button" href="/menu-items">
              <Left />
              <span> Back to menu</span>
            </Link>
          </div>
        </>
      )) || <div className="text-center">Loading...</div>}
      {menuItem && (
        <MenuItemForm
          onSubmit={handleFormSubmit}
          menuItem={menuItem}
          onDelete={handleDeleteMenuItem}
        />
      )}
    </section>
  );
}
