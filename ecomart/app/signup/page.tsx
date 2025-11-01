"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  const iitrprRegex = /^[A-Za-z0-9._%+-]+@iitrpr\.ac\.in$/i;
  const phoneRegex = /^[0-9]{10}$/;

  const validate = () => {
    if (!name || !email || !phone || !password || !entryNumber) {
      return setError("Please fill in all fields."), false;
    }
    if (!iitrprRegex.test(email.trim())) {
      return setError("Use IIT Ropar email (@iitrpr.ac.in)."), false;
    }
    if (!phoneRegex.test(phone.trim())) {
      return setError("Phone number must be 10 digits."), false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          entryNumber,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setTempEmail(email);
      setShowOtpModal(true);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setError("Enter OTP to complete signup.");

    setLoading(true);
    setError(null);

    try {
      const verifyRes = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: tempEmail, otp }),
      });

      const data = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(data.message);

      alert("✅ Signup successful! Please login.");
      setShowOtpModal(false);
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#2F3E2F] flex items-center justify-center overflow-hidden relative px-4">

      {/* Eco Background Waves */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }}
        className="absolute bottom-0 w-[200%] h-[45%] bg-[#D6E4C3] rounded-t-[45%]" />
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }}
        className="absolute bottom-[-3%] w-[200%] h-[40%] bg-[#A9C48E] rounded-t-[50%]" />

      {/* Signup Card */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-lg bg-white/70 backdrop-blur-lg 
        border border-[#C9D7A7] rounded-3xl shadow-xl p-10"
      >
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold"><span className="text-[#5A7F51]">Eco</span>Mart</h1>
          <p className="text-[#4A5843] text-sm mt-2">Create your campus account</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields (all styled same) */}
          {[
            { label: "Full Name", state: name, set: setName, type: "text", placeholder: "Your full name" },
            { label: "College Email", state: email, set: setEmail, type: "email", placeholder: "you@iitrpr.ac.in" },
            { label: "Phone Number", state: phone, set: setPhone, type: "tel", placeholder: "10-digit number" },
          ].map((i, idx) => (
            <label key={idx} className="block">
              <span className="text-sm font-medium">{i.label}</span>
              <input
                type={i.type}
                value={i.state}
                onChange={(e) => i.set(e.target.value)}
                placeholder={i.placeholder}
                className="mt-2 w-full px-4 py-3 rounded-xl border border-[#C9D7A7] bg-white 
                focus:ring-2 focus:ring-[#5A7F51] outline-none"
              />
            </label>
          ))}

          {/* Password */}
          <label className="block relative">
            <span className="text-sm font-medium">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-[#C9D7A7] bg-white
              focus:ring-2 focus:ring-[#5A7F51] outline-none pr-14"
            />
            <button type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[55%] -translate-y-1/2 text-sm text-[#4A5843]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>

          {/* Entry Number */}
          <label className="block">
            <span className="text-sm font-medium">Entry Number</span>
            <input
              type="text"
              value={entryNumber}
              onChange={(e) => setEntryNumber(e.target.value)}
              placeholder="IITRPR Entry Number"
              className="mt-2 w-full px-4 py-3 rounded-xl bg-white border border-[#C9D7A7]
              focus:ring-2 focus:ring-[#5A7F51] outline-none"
            />
          </label>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Create Account */}
          <button
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold transition ${
              loading ? "bg-gray-400" : "bg-[#5A7F51] hover:bg-[#4D6E48] text-white"
            }`}
          >
            {loading ? "Sending OTP..." : "Sign up"}
          </button>
        </form>

        {/* Login */}
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <button onClick={() => router.push("/login")}
            className="text-[#3B5931] font-semibold hover:underline">
            Login
          </button>
        </p>
      </motion.section>

      {/* OTP Modal */}
      {showOtpModal && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.7 }} animate={{ scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center"
          >
            <h3 className="text-lg font-bold text-[#2F3E2F]">Email Verification</h3>
            <p className="text-gray-600 mt-1 mb-4">Enter the OTP sent to your IIT email</p>

            <input
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full text-center text-lg border-2 rounded-lg py-2 tracking-[0.5em]"
              placeholder="••••••"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex gap-3 mt-5">
              <button onClick={handleVerifyOtp}
                disabled={loading}
                className="flex-1 bg-[#5A7F51] text-white rounded-xl py-2 hover:bg-[#4D6E48]">
                {loading ? "Verifying..." : "Verify"}
              </button>
              <button
                onClick={() => setShowOtpModal(false)}
                className="flex-1 bg-gray-200 rounded-xl py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
