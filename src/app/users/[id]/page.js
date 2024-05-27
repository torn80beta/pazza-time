"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/app/hooks/UseProfile";
import UserForm from "@/components/layout/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
        {user && <UserForm user={user} onSave={() => {}} />}
      </div>
    </section>
  );
}
