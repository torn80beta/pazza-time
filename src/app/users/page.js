"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/app/hooks/UseProfile";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { isLoading: isProfileLoading, data: profileData } = useProfile();
  const isAdmin = profileData?.admin;

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
    </section>
  );
}
