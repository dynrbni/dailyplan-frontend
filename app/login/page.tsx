"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.dynrbni.biz.id/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        if (data.result?.data) {
          localStorage.setItem("user", JSON.stringify(data.result.data));
        }
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        // Handle error message - convert object to string if needed
        let errorMsg = "Login failed. Please check your credentials.";

        if (typeof data.message === "string") {
          errorMsg = data.message;
        } else if (typeof data.message === "object") {
          // Handle field errors from backend
          const fieldErrors = data.message?.fieldErrors;
          if (fieldErrors) {
            const errors = Object.entries(fieldErrors)
              .map(([field, msgs]: [string, any]) => {
                const messages = Array.isArray(msgs) ? msgs.join(", ") : msgs;
                return `${field}: ${messages}`;
              })
              .join("; ");
            errorMsg = errors || errorMsg;
          }
        }

        setError(errorMsg);
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100 font-sans">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-white p-16 flex-col justify-between overflow-hidden">

        {/* Decorative Solid Circles */}
        <div className="absolute w-72 h-72 bg-blue-800 rounded-full blur-3xl -top-20 -right-20 opacity-30"></div>
        <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl -bottom-20 -left-20 opacity-30"></div>

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Daily<span className="text-blue-200">Plan</span>
            </h1>
          </div>

          <span className="px-4 py-1 text-xs bg-blue-800 border border-blue-600 rounded-full tracking-widest text-white">
            PRODUCTIVE EVERY DAY
          </span>

          <h2 className="text-5xl font-bold mt-8 leading-tight">
            Plan smarter.
            <br />
            <span className="text-blue-200">Achieve faster.</span>
          </h2>

          <p className="mt-6 text-white max-w-md leading-relaxed text-sm">
            Simplify your workflow, manage priorities, and focus on what truly matters.
            Built for people who want clarity and progress.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-12">
          <div>
            <p className="text-3xl font-bold">12K+</p>
            <p className="text-xs text-white mt-1">Active Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold">98%</p>
            <p className="text-xs text-white mt-1">Satisfaction</p>
          </div>
          <div>
            <p className="text-3xl font-bold">4.9★</p>
            <p className="text-xs text-white mt-1">Rating</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center px-6 lg:px-24">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">

          <div className="mb-8">
            <p className="text-sm uppercase tracking-widest text-blue-700 font-semibold">
              Welcome Back
            </p>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">
              Sign in to your account
            </h1>
            <p className="text-slate-700 text-sm mt-2">
              Enter your credentials to continue.
            </p>
          </div>

          {success && (
            <div className="mb-6 bg-emerald-100 border border-emerald-500 text-emerald-800 rounded-xl px-4 py-3 text-sm font-medium">
              ✓ Login successful! Redirecting...
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="text-sm font-semibold text-slate-800">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@email.com"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-800">
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition"
              />
            </div>

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-700 font-medium">
                <input type="checkbox" className="accent-blue-700" />
                Remember me
              </label>
              <a href="#" className="text-blue-700 font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8 text-slate-700 text-xs font-semibold">
            <div className="flex-1 h-px bg-slate-300"></div>
            OR CONTINUE WITH
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          <button className="w-full border border-slate-300 py-3 rounded-xl font-semibold text-slate-800 hover:bg-slate-100 transition">
            Sign in with Google
          </button>

          <p className="text-center text-sm text-slate-700 mt-8">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-700 font-semibold hover:underline">
              Create one
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}