"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/app/hooks/UseProfile";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  const [users, setUsers] = useState([]);
  const isAdmin = profileData?.admin;

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (isProfileLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!isAdmin && !isProfileLoading) {
    // return <div></div>;
    return redirect("/");
  }

  return (
    <section className="max-w-xl mx-auto mt-8">
      <UserTabs isAdmin />
      <div className="mt-8">
        {users.length > 0 &&
          users.map((user) => (
            <div
              className="flex items-center gap-4 mb-2 p-1 px-4 bg-gray-100 rounded-lg"
              key={user._id}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 grow gap-4">
                <span
                  className={(!user.name ? "italic" : ``) + " text-gray-900"}
                >
                  {user.name || "No name"}
                </span>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={`/users/${user._id}`}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
