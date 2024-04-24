"use client";

import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function CategoriesPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/profile", {}).then((res) => {
      res.json().then((data) => {
        setIsAdmin(data.admin);
      });
    });
  }, []);

  if (!isAdmin) {
    return redirect("/login");
  }

  return (
    <section className="mt-8 max-w-lg mx-auto ">
      <UserTabs isAdmin={true} />
      categories
    </section>
  );
}
