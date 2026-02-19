"use client";

import { useState, useEffect } from "react";

const features = [
  {
    icon: "✦",
    title: "Daily Focus",
    desc: "Prioritize what matters most each morning. Start your day with intention, not chaos.",
  },
  {
    icon: "◈",
    title: "Smart Planning",
    desc: "Break big goals into daily actions. Your future self will thank you.",
  },
  {
    icon: "⬡",
    title: "Progress Tracking",
    desc: "See streaks, completion rates, and momentum build over time.",
  },
  {
    icon: "◉",
    title: "Gentle Reminders",
    desc: "Timely nudges — never overwhelming, always helpful.",
  },
];

const tasks = [
  { label: "Design new portfolio", time: "9:00 AM", done: true, color: "#a78bfa" },
  { label: "Review project brief", time: "10:30 AM", done: true, color: "#f472b6" },
  { label: "Team standup call", time: "12:00 PM", done: false, color: "#34d399" },
  { label: "Write weekly report", time: "3:00 PM", done: false, color: "#fbbf24" },
  { label: "Evening walk", time: "6:00 PM", done: false, color: "#60a5fa" },
];

export default function Home() {
  const [checked, setChecked] = useState<boolean[]>(tasks.map((t) => t.done));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completed = checked.filter(Boolean).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f8fafd;
          --surface: #ffffff;
          --border: rgba(0,0,0,0.07);
          --text: #111827;
          --muted: #6b7280;
          --accent: #2563eb;
          --accent2: #60a5fa;
          --glow: rgba(37,99,235,0.12);
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .serif { font-family: 'Instrument Serif', serif; }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 2.5rem;
          border-bottom: 1px solid var(--border);
          background: rgba(248,250,253,0.9);
          backdrop-filter: blur(16px);
        }

        .nav-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 2.3rem;
          letter-spacing: -0.02em;
          color: var(--text);
        }

        .nav-logo span { color: var(--accent); }

        .nav-links {
          display: flex; gap: 2rem; list-style: none;
        }

        .nav-links a {
          color: var(--muted); text-decoration: none; font-size: 1.3rem;
          transition: color 0.2s;
        }

        .nav-links a:hover { color: var(--text); }

        .nav-cta {
          background: var(--accent);
          color: #ffffff;
          border: none; border-radius: 999px;
          padding: 0.55rem 1.4rem;
          font-size: 0.875rem; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s, transform 0.2s;
        }

        .nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 7rem 1.5rem 4rem;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -200px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero::after {
          content: '';
          position: absolute;
          bottom: 0; right: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(37,99,235,0.08);
          border: 1px solid rgba(37,99,235,0.2);
          border-radius: 999px;
          padding: 0.35rem 1rem;
          font-size: 0.8rem; color: var(--accent);
          margin-bottom: 2rem;
          animation: fadeUp 0.6s ease both;
        }

        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
          max-width: 900px;
          margin-bottom: 1.5rem;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        h1 em {
          font-style: italic;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          color: var(--muted);
          font-size: 1.125rem;
          max-width: 480px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .hero-actions {
          display: flex; gap: 1rem; align-items: center;
          animation: fadeUp 0.6s 0.3s ease both;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          border: none; border-radius: 999px;
          padding: 0.85rem 2rem;
          font-size: 1rem; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 32px rgba(167,139,250,0.25);
        }

        .btn-primary:hover {
          opacity: 0.9; transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(167,139,250,0.4);
        }

        .btn-ghost {
          background: transparent;
          color: var(--muted);
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 999px;
          padding: 0.85rem 2rem;
          font-size: 1rem;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: color 0.2s, border-color 0.2s;
        }

        .btn-ghost:hover { color: var(--text); border-color: rgba(0,0,0,0.3); background: rgba(0,0,0,0.04); }

        /* PREVIEW CARD */
        .preview-wrap {
          margin-top: 5rem;
          width: 100%; max-width: 540px;
          animation: fadeUp 0.8s 0.4s ease both;
          position: relative; z-index: 1;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 1.5rem;
          padding: 1.75rem;
          box-shadow: 0 16px 48px rgba(37,99,235,0.08), 0 1px 3px rgba(0,0,0,0.06);
        }

        .card-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .card-title {
          font-size: 0.75rem; text-transform: uppercase;
          letter-spacing: 0.12em; color: var(--muted);
        }

        .card-date {
          font-size: 0.75rem; color: var(--muted);
        }

        .progress-bar-wrap {
          background: rgba(0,0,0,0.06);
          border-radius: 999px;
          height: 4px;
          margin-bottom: 1.5rem;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          border-radius: 999px;
          transition: width 0.5s ease;
        }

        .progress-label {
          display: flex; justify-content: space-between;
          font-size: 0.75rem; color: var(--muted);
          margin-bottom: 1.25rem;
        }

        .task-item {
          display: flex; align-items: center; gap: 0.875rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .task-item:last-child { border-bottom: none; }
        .task-item:hover { opacity: 0.8; }

        .task-check {
          width: 20px; height: 20px; border-radius: 50%;
          border: 1.5px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .task-check.done {
          background: currentColor;
        }

        .task-check.done::after {
          content: '✓';
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
        }

        .task-label {
          flex: 1; font-size: 0.9rem;
          transition: color 0.2s;
        }

        .task-label.done { color: var(--muted); text-decoration: line-through; }

        .task-time {
          font-size: 0.75rem; color: var(--muted);
        }

        /* FEATURES */
        .section {
          padding: 6rem 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-label {
          text-align: center;
          font-size: 1.75rem; text-transform: uppercase;
          letter-spacing: 0.15em; color: var(--accent);
          margin-bottom: 1rem;
        }

        .section-title {
          text-align: center;
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .section-sub {
          text-align: center;
          color: var(--muted); font-size: 1.200rem;
          max-width: 440px; margin: 0 auto 4rem;
          line-height: 1.7;

        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
        }

        .feature-card {
          background: var(--surface);
          border-radius: 1.25rem;
          padding: 1.75rem;
          position: relative;
          transition: transform 0.35s, box-shadow 0.35s;
          border: none;
          isolation: isolate;
        }

        .feature-card::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 1.25rem;
          padding: 1.5px;
          background: rgba(0,0,0,0.07);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: opacity 0.35s;
        }

        .feature-card::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 1.25rem;
          padding: 1.5px;
          background: linear-gradient(135deg, #2563eb, #93c5fd, #2563eb);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s;
        }

        .feature-card:hover::before { opacity: 0; }
        .feature-card:hover::after { opacity: 1; }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(37,99,235,0.1), 0 0 24px rgba(37,99,235,0.06);
        }

        .feature-icon {
          font-size: 1.5rem; color: var(--accent);
          margin-bottom: 1.25rem;
          display: block;
        }

        .feature-title {
          font-size: 1rem; font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .feature-desc {
          font-size: 0.875rem; color: var(--muted);
          line-height: 1.65;
        }

        /* PRICING */
        .pricing-section {
          padding: 6rem 1.5rem;
          text-align: center;
          position: relative; overflow: hidden;
          max-width: 1100px; margin: 0 auto;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
          margin-top: 3.5rem;
          text-align: left;
        }

        .pricing-card {
          background: var(--surface);
          border-radius: 1.5rem;
          padding: 2rem;
          position: relative;
          transition: transform 0.35s, box-shadow 0.35s;
          /* default border via pseudo */
          border: none;
          isolation: isolate;
        }

        /* default border using box-shadow */
        .pricing-card::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 1.5rem;
          padding: 1.5px;
          background: rgba(0,0,0,0.07);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: opacity 0.35s;
          z-index: 0;
        }

        /* gradient border on hover */
        .pricing-card::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 1.5rem;
          padding: 1.5px;
          background: linear-gradient(135deg, #2563eb, #93c5fd, #2563eb);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s;
          z-index: 0;
        }

        .pricing-card:hover::before { opacity: 0; }
        .pricing-card:hover::after { opacity: 1; }

        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(37,99,235,0.12), 0 0 32px rgba(37,99,235,0.08);
        }

        .pricing-card.popular::after {
          opacity: 1;
        }

        .pricing-card.popular::before {
          opacity: 0;
        }

        .pricing-card.popular {
          box-shadow: 0 0 32px rgba(37,99,235,0.12), 0 16px 48px rgba(37,99,235,0.1);
        }

        .popular-badge {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: var(--accent); color: #fff;
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.25rem 0.875rem; border-radius: 999px;
          white-space: nowrap;
        }

        .pricing-plan {
          font-size: 0.75rem; text-transform: uppercase;
          letter-spacing: 0.12em; color: var(--muted);
          margin-bottom: 0.75rem;
        }

        .pricing-price {
          font-family: 'Instrument Serif', serif;
          font-size: 3rem; letter-spacing: -0.03em;
          line-height: 1; margin-bottom: 0.25rem;
        }

        .pricing-price span {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem; color: var(--muted); font-weight: 300;
        }

        .pricing-desc {
          color: var(--muted); font-size: 0.875rem;
          margin-bottom: 1.5rem; line-height: 1.6;
        }

        .pricing-divider {
          height: 1px; background: var(--border);
          margin-bottom: 1.5rem;
        }

        .pricing-features-list {
          list-style: none;
          display: flex; flex-direction: column; gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .pricing-features-list li {
          display: flex; align-items: center; gap: 0.625rem;
          font-size: 0.875rem; color: var(--text);
        }

        .check-icon {
          width: 16px; height: 16px; border-radius: 50%;
          background: rgba(37,99,235,0.1);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; flex-shrink: 0;
          font-weight: 700;
        }

        .pricing-btn {
          width: 100%;
          padding: 0.8rem;
          border-radius: 999px;
          font-size: 0.9rem; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s, transform 0.2s;
          border: none;
        }

        .pricing-btn.outline {
          background: transparent;
          border: 1px solid rgba(0,0,0,0.15);
          color: var(--text);
        }

        .pricing-btn.outline:hover { background: rgba(0,0,0,0.04); }

        .pricing-btn.solid {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          box-shadow: 0 4px 24px rgba(37,99,235,0.25);
        }

        .pricing-btn.solid:hover { opacity: 0.9; transform: translateY(-1px); }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border);
          padding: 2rem 2.5rem;
          display: flex; align-items: center; justify-content: space-between;
          color: var(--muted); font-size: 0.8rem;
        }

       
      

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          nav { padding: 1rem 1.25rem; }
          .nav-links { display: none; }
          .hero-actions { flex-direction: column; width: 100%; }
          .btn-primary, .btn-ghost { width: 100%; }
          .input-group { flex-direction: column; }
          footer { flex-direction: column; gap: 1rem; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">DailyPlan</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          
        </ul>
       <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn-ghost">Login</button>
          <button className="nav-cta">Get Started Free</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="badge">
          <span className="badge-dot" />
          Now available on all devices
        </div>

        <h1>
          Your day,<br />
          <em>beautifully</em> planned
        </h1>

        <p className="hero-sub">
          A calm, focused space to organize your tasks, build habits, and make every day count — without the overwhelm.
        </p>

        <div className="hero-actions">
          <button className="btn-primary">Start for free</button>
        </div>

        {/* INTERACTIVE PREVIEW */}
        {mounted && (
          <div className="preview-wrap">
            <div className="card">
              <div className="card-header">
                <span className="card-title">Today&apos;s Plan</span>
                <span className="card-date">
                  {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </span>
              </div>

              <div className="progress-label">
                <span>{completed} of {tasks.length} completed</span>
                <span style={{ color: "var(--accent)" }}>{progress}%</span>
              </div>

              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>

              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="task-item"
                  onClick={() =>
                    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))
                  }
                >
                  <div
                    className={`task-check${checked[i] ? " done" : ""}`}
                    style={{ color: task.color, borderColor: task.color }}
                  />
                  <span className={`task-label${checked[i] ? " done" : ""}`}>{task.label}</span>
                  <span className="task-time">{task.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section className="section" id="about" style={{ paddingBottom: "2rem", textAlign: "center" }}>
        <div className="section-label">About</div>
        <h2 className="section-title">Built with intention</h2>
        <p className="section-sub" style={{ maxWidth: "520px", margin: "0 auto 3rem" }}>
          Planly started as a personal tool to bring calm to chaotic mornings. Today it helps thousands of people show up to their day with clarity — without the noise of over-engineered apps.
        </p>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-label">Why Planly</div>
        <h2 className="section-title">
          Built for how you<br />
          <em className="serif" style={{ fontStyle: "italic", color: "var(--accent)" }}>actually</em> work
        </h2>
        <p className="section-sub">
          No bloat. No noise. Just the tools you need to show up fully for your day.
        </p>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <span className="feature-icon">{f.icon}</span>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Simple, honest pricing</h2>
        <p className="section-sub">Start free, upgrade when you&apos;re ready. No hidden fees.</p>

        <div className="pricing-grid">
          {/* FREE */}
          <div className="pricing-card">
            <div className="pricing-plan">Free</div>
            <div className="pricing-price">$0 <span>/ forever</span></div>
            <p className="pricing-desc">Perfect for getting started and building your first routines.</p>
            <div className="pricing-divider" />
            <ul className="pricing-features-list">
              <li><span className="check-icon">✓</span> Up to 5 daily tasks</li>
              <li><span className="check-icon">✓</span> Basic progress tracking</li>
              <li><span className="check-icon">✓</span> Daily reminders</li>
              <li><span className="check-icon">✓</span> Mobile & desktop access</li>
            </ul>
            <button className="pricing-btn outline">Get started free</button>
          </div>

          {/* PRO */}
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-plan">Pro</div>
            <div className="pricing-price">$7 <span>/ month</span></div>
            <p className="pricing-desc">For people serious about their productivity and daily growth.</p>
            <div className="pricing-divider" />
            <ul className="pricing-features-list">
              <li><span className="check-icon">✓</span> Unlimited tasks & projects</li>
              <li><span className="check-icon">✓</span> Smart planning & priorities</li>
              <li><span className="check-icon">✓</span> Habit streaks & analytics</li>
              <li><span className="check-icon">✓</span> Calendar integrations</li>
              <li><span className="check-icon">✓</span> Custom reminders</li>
            </ul>
            <button className="pricing-btn solid">Start 7-day free trial</button>
          </div>

          {/* TEAM */}
          <div className="pricing-card">
            <div className="pricing-plan">Team</div>
            <div className="pricing-price">$19 <span>/ mo per seat</span></div>
            <p className="pricing-desc">Collaborate and stay aligned with your whole team, daily.</p>
            <div className="pricing-divider" />
            <ul className="pricing-features-list">
              <li><span className="check-icon">✓</span> Everything in Pro</li>
              <li><span className="check-icon">✓</span> Shared workspaces</li>
              <li><span className="check-icon">✓</span> Team progress dashboard</li>
              <li><span className="check-icon">✓</span> Admin controls</li>
              <li><span className="check-icon">✓</span> Priority support</li>
            </ul>
            <button className="pricing-btn outline">Contact sales</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
 <footer>
  <span className="absolute left-1/2 -translate-x-1/2 text-sm text-gray-500">
    © 2025 DailyPlan. All rights reserved.
  </span>
</footer>


    </>
  );
}