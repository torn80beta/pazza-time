"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../hooks/UseProfile";
import { redirect } from "next/navigation";
import Link from "next/link";
import Right from "@/components/icons/Right";

export default function MenuItemsPage() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
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
      <h2 className="text-3xl text-center mb-8">Menu items page</h2>
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <Link className="button flex" href="/menu-items/new">
          Add new item
          <Right />
        </Link>
      </div>
    </section>
  );
}
