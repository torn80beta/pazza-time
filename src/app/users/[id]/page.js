"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/app/hooks/UseProfile";

export default function EditUserPage() {
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
    <section className="mt-8 mx-auto max-w-xl">
      <UserTabs isAdmin />
      <div className="mt-8">user info form</div>
    </section>
  );
}
