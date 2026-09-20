import "./style.css";
import { COURSES_PREVIEW, FEATURES } from "./data";

/* =========================================================
   NAVBAR
========================================================= */

export function Navbar({
  onLogin,
  onRegister,
  menuOpen,
  onToggleMenu,
}) {
  return (
    <header className="nav">

      {/* LOGO */}

      <a className="brand" href="#top">

        <span className="brand-mark">
          CS
        </span>

        <span>
          Class<span>Schedule</span>
        </span>

      </a>

      {/* NAVIGATION */}

      <ul
        className={`nav-links ${
          menuOpen ? "mobile-open" : ""
        }`}
      >

        <li>
          <a
            href="#how"
            onClick={onToggleMenu}
          >
            How it works
          </a>
        </li>

        <li>
          <a
            href="#features"
            onClick={onToggleMenu}
          >
            Features
          </a>
        </li>

        <li>
          <a
            href="#board"
            onClick={onToggleMenu}
          >
            Find My Course
          </a>
        </li>

      </ul>

      {/* CR AUTH */}

      <div className="nav-auth">

        <button
          className="btn btn-ghost"
          onClick={onLogin}
        >
          CR Login
        </button>

        <button
          className="btn btn-solid"
          onClick={onRegister}
        >
          CR Create Account
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

/* =========================================================
   HERO
========================================================= */

export function Hero({
  onFindCourse,
  onLogin,
}) {
  return (
    <section
      className="hero"
      id="top"
    >

      {/* =====================================================
          HERO LEFT
      ===================================================== */}

      <div className="hero-left">

        <div className="eyebrow">

          <span className="eyebrow-dot"></span>

          Academic Information, Organised By Course

        </div>

        <h1>
          Everything Your Class Needs,
          <span> In One Place.</span>
        </h1>

        <p className="hero-description">
          ClassSchedule gives every course its own organised space
          for class updates, notes, study materials, announcements,
          exam information and assignments — so important information
          never gets buried in group chats.
        </p>

        <div className="hero-buttons">

          {/* =================================================
              STUDENT BUTTON
          ================================================= */}

          <button
            className="btn btn-solid btn-large"
            onClick={onFindCourse}
          >
            Find my course
            <span>→</span>
          </button>

          {/* =================================================
              CR BUTTON
          ================================================= */}

          <button
            className="btn btn-ghost btn-large"
            onClick={onLogin}
          >
            CR Login
          </button>

        </div>

        <div className="hero-points">

          <span>
            <b>✓</b>
            One Time Login
          </span>

          <span>
            <b>✓</b>
            Section-based content
          </span>

          <span>
            <b>✓</b>
            Easy to access
          </span>

        </div>

      </div>

      {/* =====================================================
          HERO RIGHT — COURSE BOARD PREVIEW
      ===================================================== */}

      <div className="hero-right">

        <div
          className="board-card"
          id="board"
        >

          {/* BOARD HEADER */}

          <div className="board-top">

            <div>

              <div className="board-course">
                CSE 211
              </div>

              <div className="board-name">
                Data Stucture And Algorithms
              </div>

            </div>

            <div className="section-badge">
              Section 1
            </div>

          </div>

          {/* BOARD TABS */}

          <div className="board-tabs">

            <button className="active">
              All
            </button>

            <button>
              Exams
            </button>

            <button>
              Materials
            </button>

            <button>
              Assignments
            </button>

          </div>

          {/* BOARD NOTICES */}

          {COURSES_PREVIEW
            .slice(0, 2)
            .map((item) => (

              <div
                className="notice-card"
                key={item.title}
              >

                <div className="notice-icon">
                  {item.icon}
                </div>

                <div className="notice-content">

                  <div className="notice-meta">

                    <span>
                      {item.cr}
                    </span>

                    <span>
                      {item.time}
                    </span>

                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.note}
                  </p>

                  <span
                    className={`notice-tag ${item.tagClass}`}
                  >
                    {item.kind}
                  </span>

                </div>

              </div>

            ))}

          {/* BOARD FOOTER */}

          <div className="board-footer">

            <span>
              12 updates in this course
            </span>

            <span className="view-all">
              View all →
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

const STEPS = [
  {
    number: "01",

    title: "CR creates the course board",

    body:
      "A CR logs in and creates or manages the board for a subject and section.",
  },

  {
    number: "02",

    title: "CR posts academic updates",

    body:
      "The CR can add routine changes, announcements, notes, study materials, exam information and assignments.",
  },

  {
    number: "03",

    title: "Students create an account",

    body:
      "Students create their own ClassBoard account and log in to access their academic information.",
  },

  {
    number: "04",

    title: "Everything stays organised",

    body:
      "Students can return whenever they need notes, materials, announcements, exams or assignments.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="section how-section"
      id="how"
    >

      <div className="section-heading">

        <div className="section-label">
          HOW IT WORKS
        </div>

        <h2>
          Simple for students.
          <span> Powerful for CRs.</span>
        </h2>

        <p>
          Students get their own account while CRs manage
          the academic information for their course and section.
        </p>

      </div>

      <div className="steps-grid">

        {STEPS.map((step) => (

          <div
            className="step-card"
            key={step.number}
          >

            <div className="step-number">
              {step.number}
            </div>

            <h3>
              {step.title}
            </h3>

            <p>
              {step.body}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

/* =========================================================
   FEATURES
========================================================= */

export function Features() {
  return (
    <section
      className="section features-section"
      id="features"
    >

      <div className="section-heading">

        <div className="section-label">
          WHAT STUDENTS CAN FIND
        </div>

        <h2>
          Your course information,
          <span> all in one place.</span>
        </h2>

        <p>
          Instead of searching through hundreds of messages,
          students can directly find the information they need.
        </p>

      </div>

      <div className="features-grid">

        {FEATURES.map((feature) => (

          <div
            className="feature-card"
            key={feature.title}
          >

            <div
              className={`feature-icon ${feature.iconClass}`}
            >
              {feature.icon}
            </div>

            <h3>
              {feature.title}
            </h3>

            <p>
              {feature.body}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

/* =========================================================
   CR CTA BAND
========================================================= */

export function CtaBand({
  onRegister,
  onLogin,
}) {
  return (
    <section className="cta-band">

      <div>

        <div className="cta-label">
          FOR CLASS REPRESENTATIVES
        </div>

        <h2>
          Keep your class information organised.
        </h2>

        <p>
          Create a course board and make it easier for
          your classmates to find important academic information.
        </p>

      </div>

      <div className="cta-buttons">

        <button
          className="btn btn-white btn-large"
          onClick={onRegister}
        >
          Create CR Account
        </button>

        <button
          className="btn btn-outline-white btn-large"
          onClick={onLogin}
        >
          CR Login
        </button>

      </div>

    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

export function Footer() {
  return (
    <footer className="footer">

      <div className="footer-brand">

        <span className="footer-mark">
          CS
        </span>

        <strong>
          Class<span>Schedule</span>
        </strong>

      </div>

      <p>
        Academic information, organised by course.
      </p>

      <span>
        © {new Date().getFullYear()} ClassSchedule
      </span>

    </footer>
  );
}

/* =========================================================
   AUTH MODAL
========================================================= */

export function AuthModal({
  authView,
  onClose,
  onSwitch,
}) {
  if (!authView) {
    return null;
  }

  /*
    =========================================================
    DETERMINE USER TYPE
    =========================================================
  */

  const isStudent =
    authView === "student-login" ||
    authView === "student-register";

  const isCR =
    authView === "cr-login" ||
    authView === "cr-register";

  const isLogin =
    authView === "student-login" ||
    authView === "cr-login";

  const isRegister =
    authView === "student-register" ||
    authView === "cr-register";

  /*
    =========================================================
    TITLE
    =========================================================
  */

  let title = "";

  if (authView === "student-login") {
    title = "Student Login";
  }

  if (authView === "student-register") {
    title = "Create Student Account";
  }

  if (authView === "cr-login") {
    title = "CR Login";
  }

  if (authView === "cr-register") {
    title = "Create CR Account";
  }

  /*
    =========================================================
    SUBMIT
    =========================================================
  */

  function handleSubmit(e) {
    e.preventDefault();

    /*
      Backend authentication will be connected later.

      For now this only prevents page refresh.
    */

    console.log(
      `${isStudent ? "Student" : "CR"} ${
        isLogin ? "login" : "registration"
      } submitted`
    );
  }

  /*
    =========================================================
    SWITCH LOGIN / REGISTER
    =========================================================
  */

  function handleSwitch() {
    if (isStudent) {
      if (isLogin) {
        onSwitch("student-register");
      } else {
        onSwitch("student-login");
      }

      return;
    }

    if (isCR) {
      if (isLogin) {
        onSwitch("cr-register");
      } else {
        onSwitch("cr-login");
      }
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {

        if (e.target === e.currentTarget) {
          onClose();
        }

      }}
    >

      <div className="modal">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="modal-head">

          <div>

            <div className="modal-label">

              {isStudent
                ? "STUDENT"
                : "CLASS REPRESENTATIVE"}

            </div>

            <h3>
              {title}
            </h3>

          </div>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>

        </div>

        {/* =================================================
            STUDENT INFO
        ================================================= */}

        {isStudent && (
          <div className="modal-info student-info">

            <span>
              🎓
            </span>

            <p>
              {isLogin
                ? "Login to your ClassSchedule student account to access your courses and academic information."
                : "Create your student account to access course notes, materials, announcements, exams and assignments."
              }
            </p>

          </div>
        )}

        {/* =================================================
            CR INFO
        ================================================= */}

        {isCR && (
          <div className="modal-info cr-info">

            <span>
              👨‍🏫
            </span>

            <p>
              This account is for Class Representatives
              who manage course boards and post academic updates.
            </p>

          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* FULL NAME — REGISTER ONLY */}

          {isRegister && (
            <div className="field">

              <label htmlFor="authName">
                Full Name
              </label>

              <input
                id="authName"
                type="text"
                placeholder="Your full name"
                required
              />

            </div>
          )}

          {/* EMAIL */}

          <div className="field">

            <label htmlFor="authEmail">
              University Email
            </label>

            <input
              id="authEmail"
              type="email"
              placeholder="000000@student.pu.edu.bd"
              required
            />

          </div>

          {/* =================================================
              STUDENT REGISTRATION
          ================================================= */}

          {isStudent && isRegister && (
            <>
              <div className="field">

                <label htmlFor="studentId">
                  Student ID
                </label>

                <input
                  id="studentId"
                  type="text"
                  placeholder="e.g. 221-15-1234"
                  required
                />

              </div>

              <div className="field">

                <label htmlFor="studentBatch">
                  Batch
                </label>

                <input
                  id="studentBatch"
                  type="text"
                  placeholder="e.g. 242/251/261"
                  required
                />

              </div>
            </>
          )}

          {/* =================================================
              CR REGISTRATION
          ================================================= */}

          {isCR && isRegister && (
            <>
              <div className="field">

                <label htmlFor="crSemester">
                  Semester
                </label>

                <input
                  id="crSubject"
                  type="text"
                  placeholder="e.g. 7th Semester"
                  required
                />

              </div>

              <div className="field">

                <label htmlFor="crSection">
                  Section
                </label>

                <input
                  id="crSection"
                  type="text"
                  placeholder="e.g. A"
                  required
                />

              </div>
            </>
          )}

          {/* PASSWORD */}

          <div className="field">

            <label htmlFor="authPassword">
              Password
            </label>

            <input
              id="authPassword"
              type="password"
              placeholder="••••••••"
              required
            />

          </div>

          {/* FORGOT PASSWORD */}

          {isLogin && (
            <div className="forgot-password">

              <button type="button">
                Forgot password?
              </button>

            </div>
          )}

          {/* SUBMIT BUTTON */}

          <button
            className="btn btn-solid auth-submit"
            type="submit"
          >

            {isStudent
              ? isLogin
                ? "Login as Student"
                : "Create Student Account"
              : isLogin
                ? "Login as CR"
                : "Create CR Account"}

          </button>

        </form>

        {/* =================================================
            SWITCH LOGIN / REGISTER
        ================================================= */}

        <div className="modal-switch">

          {isLogin ? (
            <>
              Don't have a{" "}
              {isStudent ? "student" : "CR"}{" "}
              account?{" "}

              <button
                type="button"
                onClick={handleSwitch}
              >
                Create account
              </button>
            </>
          ) : (
            <>
              Already have a{" "}
              {isStudent ? "student" : "CR"}{" "}
              account?{" "}

              <button
                type="button"
                onClick={handleSwitch}
              >
                Login
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}