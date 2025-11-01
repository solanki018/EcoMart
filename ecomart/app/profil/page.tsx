"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, X, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const colors = {
  primary: "#5A7F51",
  accent: "#C9D7A7",
  bgStart: "#FAF9F6",
  bgEnd: "#D8CAB3",
  border: "#A28E74",
  text: "#2F3E2F",
};

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  entryNumber?: string;
  location?: string;
  bio?: string;
  profileImage?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

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
        setIsEditOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
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
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading profile...
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        User not found.
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FAF9F6] to-[#D8CAB3]">
      <Navbar />

      <section className="flex-grow max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-extrabold text-center mb-16 text-[#5A7F51]">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-[#C9D7A7] p-12 md:p-16 flex flex-col md:flex-row items-center md:items-start gap-12 transition-transform hover:scale-[1.01]">
          {/* Left Section: Image */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#5A7F51] shadow-lg mb-4">
              <img
                src={user.profileImage || "/placeholder.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#2F3E2F]">{user.name}</h2>
            <p className="text-[#5A7F51]">{user.email}</p>
          </div>

          {/* Right Section: Info */}
          <div className="text-lg space-y-4 text-[#2F3E2F] w-full md:w-2/3">
            <p><strong>Entry Number:</strong> {user.entryNumber || "—"}</p>
            <p><strong>Phone:</strong> {user.phone || "—"}</p>
            <p><strong>Location:</strong> {user.location || "—"}</p>
            <div>
              <strong>Bio:</strong>
              <p className="text-gray-700 mt-1 leading-relaxed">
                {user.bio || "No bio added yet."}
              </p>
            </div>
          </div>
        </div>

        {/* Update Button Below */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-[#5A7F51] hover:bg-[#4A6D45] transition-all shadow-md"
          >
            <Edit size={20} />
            Update Profile
          </button>
        </div>
      </section>

      <Footer />

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditOpen(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-10 w-11/12 md:w-1/2 relative shadow-2xl border border-[#E5E0D8]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setIsEditOpen(false)}
              >
                <X size={22} />
              </button>

              <h2 className="text-3xl font-bold mb-8 text-[#5A7F51] text-center">
                Edit Profile
              </h2>

              {/* Profile Image Upload */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#5A7F51] mb-3 shadow-md">
                  <img
                    src={user.profileImage || "/placeholder.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="cursor-pointer px-4 py-2 rounded-lg font-semibold text-white bg-[#5A7F51] hover:bg-[#4A6D45] transition">
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Editable Fields */}
              <div className="grid gap-5">
                {[
                  { label: "Full Name", name: "name" },
                  { label: "Phone", name: "phone" },
                  { label: "Location", name: "location" },
                ].map((field) => (
                  <label key={field.name} className="flex flex-col">
                    <span className="mb-1 font-medium text-[#2F3E2F]">
                      {field.label}
                    </span>
                    <input
                      type="text"
                      name={field.name}
                      value={(user as any)[field.name] || ""}
                      onChange={handleChange}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="rounded-xl border border-gray-300 px-4 py-2 text-[#2F3E2F] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#5A7F51] transition"
                    />
                  </label>
                ))}

                {/* Locked Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="mb-1 font-medium text-[#2F3E2F]">
                      Email (Locked)
                    </span>
                    <input
                      type="text"
                      value={user.email}
                      readOnly
                      className="rounded-xl border px-4 py-2 bg-gray-100 text-gray-600"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="mb-1 font-medium text-[#2F3E2F]">
                      Entry Number (Locked)
                    </span>
                    <input
                      type="text"
                      value={user.entryNumber || ""}
                      readOnly
                      className="rounded-xl border px-4 py-2 bg-gray-100 text-gray-600"
                    />
                  </label>
                </div>

                {/* Bio */}
                <label className="flex flex-col">
                  <span className="mb-1 font-medium text-[#2F3E2F]">Bio</span>
                  <textarea
                    name="bio"
                    rows={3}
                    value={user.bio || ""}
                    onChange={handleChange}
                    placeholder="Write something about yourself..."
                    className="rounded-xl border border-gray-300 px-4 py-2 text-[#2F3E2F] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#5A7F51] transition"
                  />
                </label>
              </div>

              {/* Save Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-10 py-3 rounded-xl font-semibold text-white bg-[#5A7F51] hover:bg-[#4A6D45] transition-all shadow-md"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-white border border-[#C9D7A7] shadow-xl rounded-2xl px-6 py-4 flex items-center gap-3 text-[#2F3E2F] z-50"
          >
            <CheckCircle2 className="text-green-600" size={28} />
            <span className="font-semibold">Profile updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
