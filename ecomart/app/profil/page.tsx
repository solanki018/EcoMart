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

interface DecodedToken {
  id: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // 🧩 Load token
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  // 🧠 Fetch profile from API
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", { headers: { Authorization: `Bearer ${token}` } });
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

  // Input handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!user) return;
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, profileImage: reader.result as string }); // base64 string
    };
    reader.readAsDataURL(file);
  }
};


  const handleSave = async () => {
    if (!user || !token) return;
    setSaving(true);

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        alert("✅ Profile updated successfully!");
      } else {
        alert("❌ Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error saving profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        User not found.
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-white">
      <Navbar />
      <section className="flex-grow max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12">
          My <span className="text-[#EC4899]">Profile</span>
        </h1>

        <div className="bg-[#1a1a1a] p-12 md:p-16 rounded-3xl border border-gray-800 shadow-xl grid gap-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#EC4899] mb-4">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-[#EC4899] text-black px-4 py-2 rounded-lg hover:bg-[#d23d87] transition">
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          {/* User Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <label className="flex flex-col">
              <span className="text-gray-400">Full Name</span>
              <input type="text" name="name" value={user.name} onChange={handleChange} className="mt-2 px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:border-[#EC4899] text-white text-lg" />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-400">Email</span>
              <input type="email" name="email" value={user.email} readOnly className="mt-2 px-4 py-3 rounded-xl bg-[#111] border border-gray-700 text-gray-400 text-lg" />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-400">Phone</span>
              <input type="text" name="phone" value={user.phone} onChange={handleChange} className="mt-2 px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:border-[#EC4899] text-white text-lg" />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-400">Entry Number</span>
              <input type="text" name="entryNumber" value={user.entryNumber} readOnly className="mt-2 px-4 py-3 rounded-xl bg-[#111] border border-gray-700 text-gray-400 text-lg" />
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <label className="flex flex-col">
              <span className="text-gray-400">Location</span>
              <input type="text" name="location" value={user.location} onChange={handleChange} className="mt-2 px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:border-[#EC4899] text-white text-lg" />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-400">Bio</span>
              <textarea name="bio" value={user.bio} onChange={handleChange} rows={4} className="mt-2 px-4 py-3 rounded-xl bg-[#111] border border-gray-700 focus:outline-none focus:border-[#EC4899] text-white text-lg" />
            </label>
          </div>

          <div className="flex justify-center">
            <button onClick={handleSave} disabled={saving} className="bg-[#EC4899] text-black font-semibold px-10 py-4 rounded-xl hover:bg-[#d23d87] transition text-lg disabled:opacity-50">
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
