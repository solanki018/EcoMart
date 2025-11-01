"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  entryNumber: string;
  location: string;
  bio: string;
  profileImage: string;
}

const colors = {
  bgTop: "#FAF9F6",
  bgBottom: "#D8CAB3",
  primary: "#5A7F51",
  secondary: "#C9D7A7",
  shadow: "#A28E74",
  text: "#2F3E2F",
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data: UserProfile = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profileImage: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!user || !token) return;
    setSaving(true);

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        alert("✅ Profile updated successfully!");
      } else {
        alert("❌ Failed to update profile.");
      }
    } catch (err) {
      alert("❌ Error saving profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-center">
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-center">
        User not found.
      </div>
    );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(to bottom, ${colors.bgTop}, ${colors.bgBottom})`,
        color: colors.text,
      }}
    >
      <Navbar />

      <section className="flex-grow max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-extrabold text-center mb-12">
          My <span style={{ color: colors.primary }}>Profile</span>
        </h1>

        <div
          className="p-10 rounded-3xl shadow-xl grid gap-8"
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${colors.shadow}`,
          }}
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div
              className="w-40 h-40 rounded-full overflow-hidden mb-4 shadow-md"
              style={{
                border: `4px solid ${colors.primary}`,
              }}
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <label
              className="cursor-pointer px-4 py-2 rounded-lg font-semibold transition"
              style={{
                backgroundColor: colors.primary,
                color: "white",
              }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", name: "name" },
              { label: "Email (Locked)", name: "email", readOnly: true },
              { label: "Phone", name: "phone" },
              { label: "Entry Number (Locked)", name: "entryNumber", readOnly: true },
            ].map((field) => (
              <label key={field.name} className="flex flex-col text-lg">
                <span className="mb-1">{field.label}</span>
                <input
                  type="text"
                  name={field.name}
                  value={(user as any)[field.name]}
                  onChange={handleChange}
                  readOnly={field.readOnly}
                  className="rounded-xl px-4 py-3 border focus:outline-none focus:ring-2"
                  style={{
                    borderColor: colors.shadow,
                    backgroundColor: field.readOnly ? "#EEE" : "#FFFFFF",
                    color: colors.text,
                  }}
                />
              </label>
            ))}
          </div>

          <label className="flex flex-col text-lg mt-4">
            <span className="mb-1">Bio</span>
            <textarea
              name="bio"
              rows={4}
              value={user.bio}
              onChange={handleChange}
              className="rounded-xl px-4 py-3 border focus:outline-none focus:ring-2"
              style={{
                borderColor: colors.shadow,
                backgroundColor: "#FFFFFF",
                color: colors.text,
              }}
            />
          </label>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="font-semibold px-10 py-4 rounded-xl transition"
              style={{
                backgroundColor: colors.primary,
                color: "white",
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfilePage;
