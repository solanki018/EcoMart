"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const iitrprRegex = /^[A-Za-z0-9._%+-]+@iitrpr\.ac\.in$/i;

  const validate = () => {
    if (!email || !password) {
      setError("Enter both email and password.");
      return false;
    }
    if (!iitrprRegex.test(email.trim())) {
      setError("Use IIT Ropar email (@iitrpr.ac.in).");
      return false;
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);

      const userData = JSON.parse(atob(data.token.split(".")[1]));
      localStorage.setItem("user", JSON.stringify(userData));

      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#2F3E2F] flex items-center justify-center relative overflow-hidden px-4">

      {/* Background Waves */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute w-[200%] h-[45%] bg-[#D6E4C3] rounded-t-[45%] bottom-[0%]"
      />
      <motion.div
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        className="absolute w-[200%] h-[40%] bg-[#A9C48E] rounded-t-[50%] bottom-[-3%]"
      />

      {/* Card */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-lg border border-[#C9D7A7] 
        rounded-3xl p-10 shadow-xl"
      >
        {/* Branding */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-[#5A7F51]">Eco</span>Mart
          </h1>
          <p className="text-sm text-[#4A5843] mt-1">Welcome back 👋</p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <label className="block">
            <span className="text-base font-medium">College Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@iitrpr.ac.in"
              className="mt-2 w-full px-4 py-3 rounded-xl bg-white border border-[#C9D7A7] 
              focus:ring-2 focus:ring-[#5A7F51] outline-none"
            />
          </label>

          {/* Password */}
          <label className="block relative">
            <span className="text-base font-medium">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-2 w-full px-4 py-3 rounded-xl bg-white border border-[#C9D7A7] 
              focus:ring-2 focus:ring-[#5A7F51] outline-none pr-14"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-[55%] -translate-y-1/2 text-sm text-[#4A5843]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-2 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#5A7F51] hover:bg-[#4D6E48] text-white"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-sm text-center">
          New here?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-[#3B5931] font-semibold hover:underline"
          >
            Create account
          </button>
        </p>
      </motion.section>
    </main>
  );
}
