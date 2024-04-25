"use client";

import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useProfile } from "@/app/hooks/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [newCategoryName, setNewCategoryName] = useState("");
  const { isLoading: isProfileLoading, data: profileData } = useProfile();

  async function handleCreateCategory(e) {
    e.preventDefault();

    const createCategoryPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({
          name: newCategoryName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        resolve();
      } else {
        reject({ error: "Failed to create new category" });
      }
    });

    await toast.promise(createCategoryPromise, {
      loading: "Creating new category...",
      success: "Category created!",
      error: "Failed to create new category",
    });
  }

  if (isProfileLoading) {
    return <div className="flex justify-center">Loading user info...</div>;
  }

  if (!profileData.admin && !isProfileLoading) {
    // return <div></div>;
    return redirect("/profile");
  }

  return (
    <section className="mt-8 max-w-lg mx-auto ">
      <UserTabs isAdmin={true} />
      <form className="mt-8 max-w-md mx-auto" onSubmit={handleCreateCategory}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label htmlFor="">New category name</label>
            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2">
            <button className="" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
