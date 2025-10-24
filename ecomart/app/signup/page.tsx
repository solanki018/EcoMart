"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [entryNumber, setEntryNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // OTP Modal states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  const iitrprRegex = /^[A-Za-z0-9._%+-]+@iitrpr\.ac\.in$/i;
  const phoneRegex = /^[0-9]{10}$/;

  const validate = () => {
    if (!name || !email || !phone || !password || !entryNumber) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!iitrprRegex.test(email.trim())) {
      setError("Use your college email (must end with @iitrpr.ac.in).");
      return false;
    }
    if (!phoneRegex.test(phone.trim())) {
      setError("Phone number must be 10 digits.");
      return false;
    }
    setError(null);
    return true;
  };

  // 🧩 Signup + Send OTP
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      // Step 1: Send signup data → backend sends OTP
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, entryNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed. Try again.");
        setLoading(false);
        return;
      }

      // ✅ Step 2: Open OTP Modal
      setTempEmail(email);
      setShowOtpModal(true);
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("OTP is required to complete signup.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const verifyRes = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: tempEmail, otp }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        setError(verifyData.message || "OTP verification failed.");
        setLoading(false);
        return;
      }

      alert("✅ Signup successful! You can now log in.");
      setShowOtpModal(false);
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("OTP verification failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <section className="w-full max-w-lg md:max-w-xl bg-neutral-900/70 backdrop-blur-md border border-neutral-800 rounded-3xl p-10 shadow-lg">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Sign up for <span className="text-[#EC4899]">EcoM</span>art
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-2">
            Create your college account
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <label className="block">
            <span className="text-base md:text-lg text-gray-300">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="mt-2 w-full px-5 py-4 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-white text-base md:text-lg"
              required
            />
          </label>

          {/* Email */}
          <label className="block">
            <span className="text-base md:text-lg text-gray-300">College Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@iitrpr.ac.in"
              className="mt-2 w-full px-5 py-4 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-white text-base md:text-lg"
              required
            />
            <p className="mt-1 text-xs md:text-sm text-gray-500">
              Must end with <span className="text-[#EC4899]">@iitrpr.ac.in</span>
            </p>
          </label>

          {/* Phone Number */}
          <label className="block">
            <span className="text-base md:text-lg text-gray-300">Phone Number</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit phone number"
              className="mt-2 w-full px-5 py-4 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-white text-base md:text-lg"
              required
            />
          </label>

          {/* Password */}
          <label className="block relative">
            <span className="text-base md:text-lg text-gray-300">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-2 w-full px-5 py-4 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-white text-base md:text-lg pr-14"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm md:text-base text-gray-300 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>

          {/* Entry Number */}
          <label className="block">
            <span className="text-base md:text-lg text-gray-300">Entry Number</span>
            <input
              type="text"
              value={entryNumber}
              onChange={(e) => setEntryNumber(e.target.value)}
              placeholder="Your entry number"
              className="mt-2 w-full px-5 py-4 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-white text-base md:text-lg"
              required
            />
          </label>

          {/* Error */}
          {error && (
            <div className="text-sm md:text-base text-red-400 bg-red-900/30 p-2 rounded">
              {error}
            </div>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-5 py-4 rounded-xl font-semibold transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed text-gray-300"
                  : "bg-[#EC4899] hover:bg-[#d23d87] text-black"
              } text-base md:text-lg`}
            >
              {loading ? "Sending OTP..." : "Sign up"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm md:text-base text-gray-400">
          Already have an account?{" "}
          <button
            className="text-[#EC4899] font-semibold hover:underline"
            onClick={() => router.push("/login")}
          >
            Login here
          </button>
        </div>
      </section>

      {/* ✅ OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center text-black">
            <h3 className="text-xl font-semibold mb-2">Verify OTP</h3>
            <p className="text-gray-600 mb-4">
              Enter the 6-digit OTP sent to your email.
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full p-2 border rounded text-center tracking-widest mb-3"
            />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="flex-1 bg-[#EC4899] text-white py-2 rounded hover:bg-[#d23d87]"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
              <button
                onClick={() => setShowOtpModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
