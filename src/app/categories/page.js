"use client";

import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfile } from "@/app/hooks/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  const isAdmin = profileData?.admin;

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }
  async function handleCategorySubmit(e) {
    e.preventDefault();

    const createCategoryPromise = new Promise(async (resolve, reject) => {
      const data = {
        name: categoryName,
      };

      if (editedCategory) {
        data._id = editedCategory._id;
      }

      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCategoryName("");
      setEditedCategory(null);
      fetchCategories();

      if (response.ok) {
        resolve();
      } else {
        reject({ error: "Failed to create new category" });
      }
    });

    await toast.promise(createCategoryPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating new category...",
      success: editedCategory ? "Category updated!" : "Category created!",
      error: "Operation failed!",
    });
  }

  async function handleDeleteCategory(_id) {
    // console.log(category);
    const deleteCategoryPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: "DELETE",
        body: JSON.stringify({ _id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        resolve();
      } else {
        reject({ error: "Failed to delete category" });
      }
    });
    await toast.promise(deleteCategoryPromise, {
      loading: "Deleting category...",
      success: "Category deleted!",
      error: "Operation failed!",
    });
    fetchCategories();
  }

  if (isProfileLoading) {
    return <div className="flex justify-center">Loading user info...</div>;
  }

  if (!isAdmin && !isProfileLoading) {
    // return <div></div>;
    return redirect("/profile");
  }

  return (
    <section className="mt-8 max-w-lg mx-auto ">
      <UserTabs isAdmin={isAdmin} />
      {isAdmin && (
        <>
          <form
            className="mt-8 max-w-md mx-auto"
            onSubmit={handleCategorySubmit}
          >
            <div className="flex gap-2 items-end">
              <div className="grow">
                <label htmlFor="">
                  {editedCategory ? "Update category" : "Create new category"}
                  {editedCategory && <b>{": " + editedCategory.name}</b>}
                </label>
                <input
                  type="text"
                  placeholder="Category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div className="pb-2 flex gap-1">
                <button className="" type="submit">
                  {editedCategory ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(null);
                    setCategoryName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>

          <div className="flex flex-col items-center px-8">
            <h2 className="mt-8 text-sm text-gray-500 self-start">
              Existing categories:
            </h2>
            {categories?.length > 0 &&
              categories.map((category) => (
                <div
                  className="flex items-center gap-1 w-full rounded-xl p-2 px-4 mb-1 bg-gray-100"
                  key={category.name}
                >
                  {/* <span className="text-gray-500">edit category:</span> */}
                  <div className="grow">{category.name}</div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditedCategory(category);
                        setCategoryName(category.name);
                      }}
                    >
                      Edit
                    </button>
                    <DeleteButton
                      label={"Delete"}
                      onDelete={() => handleDeleteCategory(category._id)}
                    />
                    {/* <button
                      type="button"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
