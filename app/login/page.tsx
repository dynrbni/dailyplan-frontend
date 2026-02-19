"use client";
import React, { useState, FC, FormEvent } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Sora:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue-dark: #0A2463;
    --blue-mid: #1E5FD9;
    --blue-light: #4D90FE;
    --blue-pale: #E8F0FE;
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

  .panel-left {
    flex: 0 0 48%;
    background: linear-gradient(145deg, var(--blue-dark) 0%, var(--blue-mid) 60%, #3B82F6 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px;
    position: relative;
    overflow: hidden;
  }

  .panel-left::before {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    border: 60px solid rgba(255,255,255,0.05);
    top: -100px; right: -100px;
  }
  .panel-left::after {
    content: '';
    position: absolute;
    width: 280px; height: 280px;
    border-radius: 50%;
    border: 40px solid rgba(255,255,255,0.07);
    bottom: -60px; left: -60px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1;
    position: relative;
  }

  .brand-icon {
    width: 36px; height: 36px;
    background: rgba(255,255,255,0.2);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(10px);
  }

  .brand-name {
    font-family: 'Sora', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.3px;
  }

  .brand-name span { color: #93C5FD; }

  .hero-content { z-index: 1; position: relative; }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 100px;
    padding: 6px 14px;
    font-size: 12px;
    color: #BAD4FF;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
  }

  .hero-title {
    font-family: 'Sora', sans-serif;
    font-size: 36px;
    font-weight: 700;
    color: var(--white);
    line-height: 1.25;
    margin-bottom: 16px;
  }

  .hero-title span { color: #93C5FD; display: block; }

  .hero-desc {
    font-size: 15px;
    color: rgba(255,255,255,0.65);
    line-height: 1.7;
    max-width: 340px;
    font-weight: 300;
  }

  .hero-stats {
    display: flex;
    gap: 32px;
    margin-top: 40px;
  }

  .stat-num {
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--white);
  }
  .stat-label {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    margin-top: 2px;
  }

  .float-card {
    position: absolute;
    top: 50%;
    right: -24px;
    transform: translateY(-60%);
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 16px;
    padding: 20px;
    width: 180px;
    z-index: 2;
  }

  .float-card-title {
    font-size: 11px;
    color: rgba(255,255,255,0.6);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .float-task {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .task-check {
    width: 16px; height: 16px;
    border-radius: 4px;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }

  .task-check.done { background: var(--success); }
  .task-check.todo { background: rgba(255,255,255,0.2); border: 1.5px solid rgba(255,255,255,0.3); }

  .task-text { font-size: 12px; color: rgba(255,255,255,0.85); }
  .task-text.done { text-decoration: line-through; opacity: 0.5; }

  .panel-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 60px;
    background: var(--white);
  }

  .form-wrap { width: 100%; max-width: 380px; }

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
    font-size: 28px;
    font-weight: 700;
    color: var(--blue-dark);
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }

  .form-sub {
    font-size: 14px;
    color: var(--gray-text);
    margin-bottom: 32px;
  }

  .field { margin-bottom: 18px; }

  .field label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--blue-dark);
    margin-bottom: 7px;
  }

  .field input {
    width: 100%;
    padding: 13px 16px;
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

  .forgot-row {
    display: flex;
    justify-content: flex-end;
    margin-top: -10px;
    margin-bottom: 18px;
  }

  .forgot-row a {
    font-size: 13px;
    color: var(--blue-mid);
    text-decoration: none;
    cursor: pointer;
    font-weight: 500;
  }

  .forgot-row a:hover { text-decoration: underline; }

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
    margin: 22px 0;
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

  .register-link {
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: var(--gray-text);
  }

  .register-link a {
    color: var(--blue-mid);
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }

  .register-link a:hover { text-decoration: underline; }

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

  @media (max-width: 900px) {
    .panel-left { display: none; }
    .panel-right { padding: 40px 24px; }
  }
`;

interface Task {
  done: boolean;
  text: string;
}

interface LoginForm {
  email: string;
  password: string;
}

const GoogleIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>
);

const CheckIcon: FC = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const tasks: Task[] = [
  { done: true, text: "Review report" },
  { done: true, text: "Team meeting" },
  { done: false, text: "Update roadmap" },
  { done: false, text: "Send proposal" },
];

export default function LoginPage(): React.ReactElement {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        {/* Left Panel */}
        <div className="panel-left">
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

          <div className="float-card">
            <div className="float-card-title">Today</div>
            {tasks.map((t: Task, i: number) => (
              <div className="float-task" key={i}>
                <div className={`task-check ${t.done ? "done" : "todo"}`}>
                  {t.done && <CheckIcon />}
                </div>
                <span className={`task-text ${t.done ? "done" : ""}`}>{t.text}</span>
              </div>
            ))}
          </div>

          <div className="hero-content">
            <div className="hero-badge">
              <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#4ADE80"/></svg>
              Productive Every Day
            </div>
            <h2 className="hero-title">
              Plan.<br />
              <span>Achieve Your Goals.</span>
            </h2>
            <p className="hero-desc">
              Manage your daily tasks, schedule, and priorities in one neat and organized place.
            </p>
            <div className="hero-stats">
              {[
                { num: "12K+", label: "Active Users" },
                { num: "98%", label: "Satisfaction" },
                { num: "4.9★", label: "Rating" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="panel-right">
          <div className="form-wrap">
            <div className="form-eyebrow">Welcome Back</div>
            <h1 className="form-title">Sign in to DailyPlan</h1>
            <p className="form-sub">Continue your plan for today.</p>

            {success && (
              <div className="success-box">✓ Signed in successfully! Redirecting to dashboard...</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <div className="forgot-row">
                <a href="#">Forgot password?</a>
              </div>
              <button className="btn-primary" type="submit">Sign In</button>
            </form>

            <div className="divider">or sign in with</div>
            <button className="btn-google" type="button"><GoogleIcon /> Google</button>

            <div className="register-link">
              Don&apos;t have an account? <a href="/register">Sign up now</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}