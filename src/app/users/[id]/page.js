"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/app/hooks/UseProfile";
import UserForm from "@/components/layout/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  const isAdmin = profileData?.admin;
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      fetch(`/api/users/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUser(data);
        });
    }
  }, [id, isAdmin]);

  async function handleFormSubmit(e, data) {
    e.preventDefault();

    const userUpdatePromise = fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Failed to update user!");
      });

    await toast.promise(userUpdatePromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Updating failed!",
    });
  }

  if (isProfileLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!isAdmin && !isProfileLoading) {
    // return <div></div>;
    return redirect("/");
  }

  return (
    <section className="mt-8 mx-auto max-w-xl">
      <UserTabs isAdmin />

      <div className="mt-8">
        {user && <UserForm user={user} onSave={handleFormSubmit} />}
      </div>
    </section>
  );
}
