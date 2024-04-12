"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data?.user?.name);
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    setProfileSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ name: userName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsSaving(false);

    if (response.ok) {
      setProfileSaved(true);
    }
  }

  async function handleFileChange(e) {
    const files = e.target.files;

    if (files.length === 1) {
      const data = new FormData();
      data.append("file", files[0]);
      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("upload_preset", "pazza-time");
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data?.user?.image;

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>

      <div className="max-w-md mx-auto">
        {profileSaved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg">
            Profile saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-100 p-4 rounded-lg">Saving...</h2>
        )}

        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={userImage}
                alt="user image"
                width={250}
                height={250}
              />
              <label>
                <input
                  className="hidden"
                  type="file"
                  onChange={handleFileChange}
                />
                <span className="block text-center border border-grey-300 rounded-lg p-2 cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={session?.data?.user?.email}
              disabled={true}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
