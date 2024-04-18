"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  // const [profileSaved, setProfileSaved] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);
  // const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data?.user?.name);
      setImage(session.data?.user?.image);
      fetch("/api/profile", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
        });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();

    const profileUpdatePromise = fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({
        name: userName,
        image,
        phone,
        streetAddress,
        postalCode,
        city,
        country,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(error);
        throw new Error("Profile update failed!");
      });
    //   .then((res) => {
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   throw new Error("Profile update failed!");
    // });

    await toast.promise(profileUpdatePromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Updating failed!",
    });

    // setProfileSaved(false);
    // setIsSaving(true);
    // const response = await fetch("/api/profile", {
    //   method: "PUT",
    //   body: JSON.stringify({ name: userName, image }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // setIsSaving(false);

    // if (response.ok) {
    //   setProfileSaved(true);
    // }
  }

  async function handleFileChange(e) {
    const files = e.target.files;

    if (files.length === 1) {
      const data = new FormData();
      data.append("file", files[0]);
      // setIsUploading(true);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((res) => {
        if (res.ok) {
          return res.json().then((link) => {
            setImage(link);
          });
        }
        throw new Error("Upload failed!");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete.",
        error: "Upload failed.",
      });

      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: data,
      // });

      // const link = await response.json();

      /* or we can use response.text() */
      // const link = await response.text();

      // setImage(link);

      // setIsUploading(false);
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

  // const userImage = session.data?.user?.image;

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>

      <div className="max-w-md mx-auto">
        {/* {profileSaved && <SuccessBox>Profile saved!</SuccessBox>} */}

        {/* {isSaving && <InfoBox>Saving...</InfoBox>} */}

        {/* {isUploading && <InfoBox>Uploading image...</InfoBox>} */}

        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg min-w-24 max-w-[120px]">
              {image && (
                <Image
                  className="rounded-lg w-full h-full mb-1"
                  src={image}
                  alt="user image"
                  width={250}
                  height={250}
                />
              )}
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
            <label>First and last name</label>
            <input
              type="text"
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={session?.data?.user?.email}
              disabled={true}
            />
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Street address</label>
            <input
              type="text"
              placeholder="Street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />

            <div className="flex gap-2">
              <div>
                <label>City</label>
                <input
                  // style={{ margin: "0" }}
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label>Postal code</label>
                <input
                  // style={{ margin: "0" }}
                  type="text"
                  placeholder="Postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
