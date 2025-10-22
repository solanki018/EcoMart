"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      setError("Please enter both email and password.");
      return false;
    }
    if (!iitrprRegex.test(email.trim())) {
      setError("Use your college email (must end with @iitrpr.ac.in).");
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
      // ====== PLACEHOLDER: replace with real auth API call ======
      await new Promise((r) => setTimeout(r, 900)); // simulate latency
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please check credentials or try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <section className="w-full max-w-lg md:max-w-xl bg-neutral-900/70 backdrop-blur-md border border-neutral-800 rounded-3xl p-10 shadow-lg">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Eco<span className="text-[#EC4899]">M</span>art
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-2">
            Sign in with your college account
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <label className="block">
            <span className="text-base md:text-lg text-gray-300">College Email</span>
            <input
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@iitrpr.ac.in"
              className="mt-2 w-full px-5 py-4 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-white text-base md:text-lg"
              aria-label="College email"
              required
            />
            <p className="mt-1 text-xs md:text-sm text-gray-500">
              Must end with <span className="text-[#EC4899]">@iitrpr.ac.in</span>
            </p>
          </label>

          {/* Password */}
          <label className="block relative">
            <span className="text-base md:text-lg text-gray-300">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 w-full px-5 py-4 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-white text-base md:text-lg pr-14"
              aria-label="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm md:text-base text-gray-300 hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center text-sm md:text-base text-gray-400">
          Don’t have an account?{" "}
          <button
            className="text-[#EC4899] font-semibold hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign up here
          </button>
        </div>
      </section>
    </main>
  );
}
