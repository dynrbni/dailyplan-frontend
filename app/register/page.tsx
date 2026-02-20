"use client";
import React, { useState, FC, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:8080/api";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}

type StrengthLevel = 0 | 1 | 2 | 3;

const GoogleIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
  </svg>
);

function getStrength(pw: string): StrengthLevel {
  if (!pw) return 0;
  if (pw.length < 6) return 1;
  if (pw.length < 10) return 2;
  return 3;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [agree, setAgree] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = getStrength(form.password);

  const handleChange =
    (field: keyof RegisterForm) =>
      (e: ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agree) return alert("Harap setujui syarat layanan.");
    if (form.password !== form.confirm) return alert("Password tidak cocok.");

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        if (data.result?.data) {
          localStorage.setItem("user", JSON.stringify(data.result.data));
        }
        setSuccess(true);
        setTimeout(() => router.push("/"), 800);
      } else {
        // Handle error message - convert object to string if needed
        let errorMsg = "Registration failed. Please try again.";
        
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
    <div className="min-h-screen flex bg-gray-50 font-sans">

      {/* LEFT FORM */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-20 py-14">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl">

          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Daily<span className="text-blue-600">Plan</span>
            </span>
          </div>

          <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-2">
            Get Started
          </p>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create your account
          </h1>

          <p className="text-sm text-gray-700 mb-6">
            Start organizing your day in a smarter way.
          </p>

          {success && (
            <div className="mb-5 bg-green-100 border border-green-600 text-green-800 px-4 py-3 rounded-xl text-sm font-semibold">
              ✓ Account created successfully! Redirecting...
            </div>
          )}

          {error && (
            <div className="mb-5 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange("firstName")}
                className="border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange("lastName")}
                className="border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange("password")}
              className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
              required
            />

            {form.password && (
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${strength >= i
                        ? strength === 1
                          ? "bg-red-600"
                          : strength === 2
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        : "bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            )}

            <input
              type="password"
              placeholder="Confirm password"
              value={form.confirm}
              onChange={handleChange("confirm")}
              className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
              required
            />

            <div className="flex items-start gap-2 text-sm text-gray-800">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 accent-blue-600"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-blue-700 font-semibold">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-700 font-semibold">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6 text-xs text-gray-600">
            <div className="flex-1 h-px bg-gray-300"></div>
            OR CONTINUE WITH
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-gray-900 hover:bg-gray-100 transition">
            <GoogleIcon /> Google
          </button>

          <p className="text-center text-sm text-gray-800 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-700 font-semibold">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white px-16 py-20 flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6">
          Plan smarter. <br />
          Achieve faster.
        </h2>

        <p className="text-base font-medium mb-10">
          DailyPlan helps you stay organized, focused, and productive every single day.
        </p>

        <div className="space-y-6 text-lg font-semibold">
          <div>✔ Task Management</div>
          <div>✔ Integrated Calendar</div>
          <div>✔ Productivity Reports</div>
          <div>✔ Smart Reminders</div>
        </div>
      </div>

    </div>
  );
}