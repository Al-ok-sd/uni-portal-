import { COURSES_PREVIEW, FEATURES } from "./data";

/* ---------- Nav ---------- */
export function Navbar({ onLogin, onRegister, menuOpen, onToggleMenu }) {
  return (
    <header className="nav">
      <a className="brand" href="#top">
        <span className="brand-mark">CR</span>
        ClassBoard
      </a>

      <ul className="nav-links">
        <li><a href="#how">How it works</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#board">See a course</a></li>
      </ul>

      <div className="nav-auth">
        <button className="btn btn-ghost" onClick={onLogin}>
          Log in
        </button>
        <button className="btn btn-solid" onClick={onRegister}>
          Register
        </button>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={onToggleMenu}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
export function Hero({ onRegister, onLogin }) {
  return (
    <section className="hero" id="top">
      <div>
        <div className="eyebrow-line">Built for CRs and their classes</div>
        <h1>Your class routine and notes, where they actually stay found.</h1>
        <p className="lede">
          Every course gets its own board. Your CR posts the exam routine
          or today's notes the moment things change — you check one page
          instead of scrolling a WhatsApp group for last month's message.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-solid btn-lg" onClick={onRegister}>
            Join your class
          </button>
          <button className="btn btn-ghost btn-lg" onClick={onLogin}>
            I already have an account
          </button>
        </div>
        <div className="hero-meta">No installs. Works from any browser, on or off campus.</div>
      </div>

      <div className="board" id="board">
        <div className="board-head">
          CSE 3105 · Database Systems
          <span>Class board</span>
        </div>
        {COURSES_PREVIEW.slice(0, 2).map((n) => (
          <div className="notice" key={n.code}>
            <div className="notice-top">
              <span>{n.cr}</span>
              <span>{n.time}</span>
            </div>
            <p>
              {n.note}
              <span className="tag">{n.kind}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
const STEPS = [
  {
    title: "CR posts to the course",
    body: "The CR opens their course board and adds the routine change or the day's notes — takes about as long as typing it into the group chat.",
  },
  {
    title: "Students see it instantly",
    body: "Everyone enrolled in that course sees the new post at the top of their board — no need to be online at the right moment.",
  },
  {
    title: "It stays organised by course",
    body: "Routine and notes for each subject live on their own board, so nothing gets buried under conversation from a different class.",
  },
  {
    title: "Find it again anytime",
    body: "Looking for last week's seat plan or the notes from the class you missed? It's still exactly where it was posted.",
  },
];

export function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="section-head">
        <h2>The same habit, minus the scrolling</h2>
        <p>Nothing new to learn — it's the CR posting an update, same as always. The difference is where it lands.</p>
      </div>
      <div className="steps">
        {STEPS.map((s, i) => (
          <div className="step" key={s.title}>
            <div className="step-num">{i + 1}</div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
export function Features() {
  return (
    <section id="features">
      <div className="section" style={{ borderBottom: "none", paddingBottom: 0 }}>
        <div className="section-head">
          <h2>Everything a class group is meant to do, kept in order</h2>
        </div>
      </div>
      <div className="features">
        {FEATURES.map((f) => (
          <div className="feature" key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */
export function CtaBand({ onRegister }) {
  return (
    <section className="cta-band">
      <h2>Ask your CR to set up your class board today.</h2>
      <button className="btn btn-solid btn-lg" onClick={onRegister}>
        Create an account
      </button>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} ClassBoard</span>
      <span>Made for students, by students</span>
    </footer>
  );
}

/* ---------- Auth modal ---------- */
export function AuthModal({ authView, onClose, onSwitch }) {
  if (!authView) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-head">
          <h3>{authView === "login" ? "Log in" : "Create your account"}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {authView === "register" && (
            <div className="field">
              <label htmlFor="role">I am a</label>
              <select id="role" defaultValue="student">
                <option value="student">Student</option>
                <option value="cr">Class Representative (CR)</option>
              </select>
            </div>
          )}

          {authView === "register" && (
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" placeholder="Your name" required />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Student email</label>
            <input id="email" type="email" placeholder="you@university.edu" required />
          </div>

          {authView === "register" && (
            <div className="field">
              <label htmlFor="section">Section / batch</label>
              <input id="section" type="text" placeholder="e.g. CSE-42, Batch 2024" required />
            </div>
          )}

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="••••••••" required />
          </div>

          <button className="btn btn-solid" type="submit">
            {authView === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <div className="modal-switch">
          {authView === "login" ? (
            <>New here? <button onClick={() => onSwitch("register")}>Register instead</button></>
          ) : (
            <>Already have an account? <button onClick={() => onSwitch("login")}>Log in instead</button></>
          )}
        </div>
      </div>
    </div>
  );
}