"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import EditableImage from "../../components/layout/EditableImage";
import UserForm from "../../components/layout/UserForm";
export default function ProfilePage() {
  // const session = useSession();
  // const { status } = session;
  // const session = useSession();
  const { status } = useSession();
  // const [userName, setUserName] = useState("");
  // const [image, setImage] = useState("");
  // const [phone, setPhone] = useState("");
  // const [streetAddress, setStreetAddress] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  // const [city, setCity] = useState("");
  // const [country, setCountry] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileFetched, setIsProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      // setUserName(session.data?.user?.name);
      // setImage(session.data?.user?.image);
      fetch("/api/profile", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          /* credentials fix  start */
          // setUserName(data.name);
          // setImage(data.image);
          /* credentials fix  end */
          // setPhone(data.phone);
          // setStreetAddress(data.streetAddress);
          // setPostalCode(data.postalCode);
          // setCity(data.city);
          // setCountry(data.country);
          setUser(data);
          setIsAdmin(data.admin);
          setIsProfileFetched(true);
        });
    }
  }, [status]);

  async function handleProfileInfoUpdate(e, data) {
    e.preventDefault();

    const profileUpdatePromise = fetch("/api/profile", {
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
        throw new Error("Profile update failed!");
      });

    await toast.promise(profileUpdatePromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Updating failed!",
    });
  }

  if (status === "loading" || !isProfileFetched) {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
        {/* <div className="flex gap-4">
          <div>
            <div className="flex flex-col p-2 rounded-lg min-w-24 max-w-[120px]">
              <EditableImage
                link={image}
                setLink={setImage}
                variant={"avatar"}
              />
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
              <div className="grow">
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
        </div> */}
      </div>
    </section>
  );
}
