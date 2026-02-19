"use client";
import React, { useState, FC, FormEvent, ChangeEvent } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Sora:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue-dark: #0A2463;
    --blue-mid: #1E5FD9;
    --blue-light: #4D90FE;
    --white: #FFFFFF;
    --gray-light: #F4F7FF;
    --gray-border: #D6E0FF;
    --gray-text: #6B7A99;
    --success: #22C55E;
  }

  body { margin: 0; }

  .page {
    min-height: 100vh;
    display: flex;
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: var(--white);
  }

  /* ── Left: form ── */
  .panel-left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 60px;
    background: var(--white);
    overflow-y: auto;
  }

  .form-wrap { width: 100%; max-width: 420px; }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
  }

  .brand-icon {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, var(--blue-mid), var(--blue-dark));
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
  }

  .brand-name {
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--blue-dark);
  }

  .brand-name span { color: var(--blue-mid); }

  .form-eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--blue-mid);
    margin-bottom: 8px;
  }

  .form-title {
    font-family: 'Sora', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--blue-dark);
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }

  .form-sub {
    font-size: 14px;
    color: var(--gray-text);
    margin-bottom: 28px;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .field { margin-bottom: 16px; }

  .field label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--blue-dark);
    margin-bottom: 7px;
  }

  .field input {
    width: 100%;
    padding: 12px 15px;
    border: 1.5px solid var(--gray-border);
    border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: var(--blue-dark);
    background: var(--white);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field input:focus {
    border-color: var(--blue-mid);
    box-shadow: 0 0 0 3px rgba(30,95,217,0.1);
  }

  .field input::placeholder { color: #B0BCDA; }

  .strength-bar {
    margin-top: 6px;
    display: flex;
    gap: 4px;
  }

  .strength-seg {
    flex: 1;
    height: 3px;
    border-radius: 100px;
    background: var(--gray-border);
    transition: background 0.3s;
  }

  .strength-seg.weak { background: #EF4444; }
  .strength-seg.ok   { background: #F59E0B; }
  .strength-seg.good { background: var(--success); }

  .strength-label {
    font-size: 11px;
    margin-top: 4px;
    color: var(--gray-text);
  }

  .checkbox-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
  }

  .checkbox-row input[type="checkbox"] {
    margin-top: 2px;
    width: 16px; height: 16px;
    accent-color: var(--blue-mid);
    cursor: pointer;
    flex-shrink: 0;
  }

  .checkbox-row label {
    font-size: 13px;
    color: var(--gray-text);
    line-height: 1.5;
    cursor: pointer;
  }

  .checkbox-row a {
    color: var(--blue-mid);
    font-weight: 600;
    text-decoration: none;
  }

  .checkbox-row a:hover { text-decoration: underline; }

  .btn-primary {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, var(--blue-mid), var(--blue-dark));
    color: var(--white);
    border: none;
    border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(30,95,217,0.3);
  }

  .btn-primary:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(30,95,217,0.4);
  }

  .btn-primary:active { transform: translateY(0); }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    font-size: 12px;
    color: #B0BCDA;
    font-weight: 500;
  }

  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--gray-border);
  }

  .btn-google {
    width: 100%;
    padding: 13px;
    background: var(--white);
    color: var(--blue-dark);
    border: 1.5px solid var(--gray-border);
    border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .btn-google:hover {
    background: var(--gray-light);
    border-color: var(--blue-light);
    box-shadow: 0 2px 8px rgba(30,95,217,0.08);
  }

  .login-link {
    text-align: center;
    margin-top: 22px;
    font-size: 14px;
    color: var(--gray-text);
  }

  .login-link a {
    color: var(--blue-mid);
    font-weight: 600;
    text-decoration: none;
  }

  .login-link a:hover { text-decoration: underline; }

  .success-box {
    background: #F0FDF4;
    border: 1.5px solid var(--success);
    color: #166534;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }

  /* ── Right: illustration ── */
  .panel-right {
    flex: 0 0 44%;
    background: linear-gradient(160deg, #0A2463 0%, #1E5FD9 55%, #60A5FA 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 48px;
    position: relative;
    overflow: hidden;
  }

  .panel-right::before {
    content: '';
    position: absolute;
    width: 350px; height: 350px;
    border-radius: 50%;
    border: 50px solid rgba(255,255,255,0.06);
    top: -80px; right: -80px;
  }

  .panel-right::after {
    content: '';
    position: absolute;
    width: 240px; height: 240px;
    border-radius: 50%;
    border: 35px solid rgba(255,255,255,0.07);
    bottom: -40px; left: -40px;
  }

  .right-content { position: relative; z-index: 1; }

  .right-title {
    font-family: 'Sora', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: var(--white);
    line-height: 1.3;
    margin-bottom: 16px;
  }

  .right-title span { color: #93C5FD; }

  .right-desc {
    font-size: 15px;
    color: rgba(255,255,255,0.65);
    line-height: 1.7;
    font-weight: 300;
    margin-bottom: 40px;
    max-width: 300px;
  }

  .features { display: flex; flex-direction: column; gap: 16px; }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .feature-icon {
    width: 40px; height: 40px;
    border-radius: 12px;
    background: rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
  }

  .feature-text-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 2px;
  }

  .feature-text-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
  }

  @media (max-width: 900px) {
    .panel-right { display: none; }
    .panel-left { padding: 40px 24px; }
    .field-row { grid-template-columns: 1fr; }
  }
`;

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}

interface Feature {
  icon: string;
  title: string;
  sub: string;
}

type StrengthLevel = 0 | 1 | 2 | 3;

const GoogleIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>
);

function getStrength(pw: string): StrengthLevel {
  if (!pw) return 0;
  if (pw.length < 6) return 1;
  if (pw.length < 10) return 2;
  return 3;
}

const strengthLabels: Record<StrengthLevel, string> = {
  0: "",
  1: "Weak",
  2: "Fair",
  3: "Strong",
};

const strengthClasses: Record<StrengthLevel, string> = {
  0: "",
  1: "weak",
  2: "ok",
  3: "good",
};

const features: Feature[] = [
  { icon: "📋", title: "Task Management", sub: "Organize & prioritize your tasks" },
  { icon: "📅", title: "Integrated Calendar", sub: "Sync your daily schedule" },
  { icon: "📊", title: "Productivity Reports", sub: "Track your progress every day" },
  { icon: "🔔", title: "Smart Reminders", sub: "Never miss a task again" },
];

export default function RegisterPage(): React.ReactElement {
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [agree, setAgree] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const strength = getStrength(form.password);

  const handleChange = (field: keyof RegisterForm) => (e: ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!agree) {
      alert("Harap setujui syarat layanan.");
      return;
    }
    if (form.password !== form.confirm) {
      alert("Kata sandi tidak cocok.");
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        
        <div className="panel-left">
          <div className="form-wrap">
            <div className="brand">
              <div className="brand-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white"/>
                  <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
                  <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
                  <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white"/>
                </svg>
              </div>
              <div className="brand-name">Daily<span>Plan</span></div>
            </div>

            <div className="form-eyebrow">Get Started</div>
            <h1 className="form-title">Create a DailyPlan Account</h1>
            <p className="form-sub">Free forever. No credit card required.</p>

            {success && (
              <div className="success-box">✓ Account created successfully! Please sign in.</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange("password")}
                  required
                />
                {form.password.length > 0 && (
                  <>
                    <div className="strength-bar">
                      {([1, 2, 3] as const).map((i) => (
                        <div
                          key={i}
                          className={`strength-seg ${strength >= i ? strengthClasses[strength] : ""}`}
                        />
                      ))}
                    </div>
                    <div className="strength-label">
                      Strength: {strengthLabels[strength]}
                    </div>
                  </>
                )}
              </div>

              <div className="field">
                <label htmlFor="confirm">Confirm Password</label>
                <input
                  id="confirm"
                  type="password"
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={handleChange("confirm")}
                  required
                />
              </div>

              <div className="checkbox-row">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agree}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAgree(e.target.checked)}
                />
                <label htmlFor="agree">
                  I agree to the <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a> of DailyPlan.
                </label>
              </div>

              <button className="btn-primary" type="submit">
                Create Free Account
              </button>
            </form>

            <div className="divider">or sign up with</div>
            <button className="btn-google" type="button">
              <GoogleIcon /> Google
            </button>

            <div className="login-link">
              Already have an account? <a href="/login">Sign in here</a>
            </div>
          </div>
        </div>

        <div className="panel-right">
          <div className="right-content">
            <h2 className="right-title">
              One step toward<br />
              <span>real productivity.</span>
            </h2>
            <p className="right-desc">
              Join thousands of users who are already planning their days better with DailyPlan.
            </p>
            <div className="features">
              {features.map((f: Feature, i: number) => (
                <div className="feature-item" key={i}>
                  <div className="feature-icon">{f.icon}</div>
                  <div>
                    <div className="feature-text-title">{f.title}</div>
                    <div className="feature-text-sub">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}